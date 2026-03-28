# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run start:dev       # Watch mode (recommended for development)
npm run start:debug     # Debug + watch mode

# Build
npm run build           # Runs `prisma generate` then `nest build`

# Testing
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:cov        # With coverage
npm run test:e2e        # End-to-end tests (uses test/jest-e2e.json)
# Run a single test file:
npx jest src/users/users.service.spec.ts

# Code quality
npm run lint            # ESLint with auto-fix
npm run format          # Prettier format
```

## Architecture

**Necroloto API** is a NestJS REST API for celebrity-themed betting circles — users bet on which celebrities will die within a year, grouped into circles.

### Authentication
All routes are protected by `ClerkAuthGuard` (in `src/auth/`). It extracts a Bearer JWT from the `Authorization` header and validates it against `CLERK_JWT_KEY`. The decoded payload is attached to `req.user`.

### Database
- PostgreSQL via **Prisma ORM** (schema at `prisma/schema.prisma`)
- Uses `@prisma/adapter-pg` (Neon serverless PostgreSQL)
- `PrismaService` (in `src/prisma/`) extends `PrismaClient` and is exported as a shared provider
- Generated Prisma client outputs to `generated/prisma/` (path alias: `@/prisma/*`)
- Run `prisma generate` (included in `npm run build`) to regenerate after schema changes

### Domain Modules

| Module | Route | Description |
|---|---|---|
| `users` | `/users` | User accounts linked to Clerk (`clerkId`) |
| `celebrities` | `/celebrities` | Celebrity data; supports search and merge |
| `bets` | `/bets` | User bets on celebrities; unique per (user, circle, year) |
| `circles` | `/circle` | Betting groups with visibility/status/join-code |
| `membership` | `/membership` | User membership in circles with roles (ADMIN/MEMBER) |
| `activity` | — | Event-driven feed of circle activity (no dedicated route; consumed via `CircleActivity`) |

### Module Architecture

Most modules follow a **Controller → Service** pattern. The `bets` module uses a fuller layered architecture:

```
Controller → Service → Repository → PrismaService
                ↓
            Mapper → Response DTOs
```

- **Repository** (`*.repository.ts`) — all Prisma queries; owns the `include` shape
- **Mapper** (`*.mapper.ts`) — converts Prisma results to typed response DTOs; input types are inferred with `Awaited<ReturnType<Repository[method]>>`
- **Response DTOs** (`dto/*-response.dto.ts`) — classes with `@ApiProperty` decorators; used as explicit return types on service methods and `@ApiResponse` types on controller routes
- DELETE endpoints return HTTP 204 with no body (`void`)

### Key Data Relationships
- A **Bet** belongs to one User and one Circle for a given year
- **CelebritiesOnBet** is the junction table linking Bets to Celebrities, with a `points` field (denormalized cache — kept in sync via `PointsEvent`)
- **PointsEvent** is the event log for every points attribution; it is the source of truth for scoring history and is used for time-based ranking queries
- A **Circle** has a `code` for joining, `status` (OPEN/LOCKED/ARCHIVED), and `visibility` (PUBLIC/PRIVATE)
- **Membership** tracks which Users are in which Circles and their role

### Points & Ranking System

Points follow an **event sourcing** pattern:

- `CelebritiesOnBet.points` — denormalized cache for fast reads; always kept in sync with `PointsEvent`
- `PointsEvent` — append-only log; every call to `updateCelebrityPoints` writes here atomically (via `$transaction`) alongside the cache update
- `UpdatePointsDto.reason` — optional string tag on each event (`"celebrity_death"` by default; supports future values like `"bonus"`, `"correction"`)
- Backfilled entries use `reason = "backfill"`

**Adding new points attributions**: always go through `BetsRepository.updateCelebrityPoints`, which runs a `$transaction` to update both tables atomically. Never write to one without the other.

**Ranking** (`GET /circle/:circleId/ranking?year=&date=`):
- Computed from `PointsEvent` filtered by `createdAt <= date`
- Tiebreaker order: total points → number of scored deaths → date of first score (earliest wins)
- Ranking logic lives in `CirclesService.getRanking`; mapper (`toRankingEntry`) only handles field conversion

**Points history** (`GET /bets/:betId/points-history`): returns all `PointsEvent` for a bet, ordered by `createdAt` asc.

### Code Style
- Prettier config: double quotes, 4-space tabs, no trailing commas, 100 char width
- TypeScript path aliases: `@/prisma/*` and `@/dto/*`
- Business logic (sorting, ranking, tiebreaking) belongs in the **service**, not the mapper
- Mapper methods are pure shape converters: Prisma result → DTO fields, no business rules

### Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (Neon)
- `CLERK_JWT_KEY` — Clerk secret key for JWT validation
- `PORT` — HTTP port (default: 3000)

Swagger UI is available at `/api` when the server is running.

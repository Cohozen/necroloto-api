# Necroloto API

REST API for **Necroloto** — a celebrity death betting game. Users bet on which celebrities will die within a year, compete inside circles, and earn points when their predictions come true.

Built with [NestJS](https://nestjs.com), [Prisma](https://www.prisma.io) and PostgreSQL (Neon serverless).

## Stack

- **Framework** — NestJS (TypeScript)
- **ORM** — Prisma with `@prisma/adapter-pg` (Neon serverless PostgreSQL)
- **Auth** — Clerk (JWT validation via `ClerkAuthGuard`)
- **API docs** — Swagger UI at `/api`

## Getting started

```bash
npm install
```

Copy `.env.example` to `.env` and fill in the required variables:

```env
DATABASE_URL=       # Neon PostgreSQL connection string
CLERK_JWT_KEY=      # Clerk secret key for JWT validation
PORT=3000
```

Apply database migrations:

```bash
npx prisma migrate dev
```

Start in watch mode:

```bash
npm run start:dev
```

Swagger UI is available at `http://localhost:3000/api`.

## Commands

```bash
# Development
npm run start:dev       # Watch mode
npm run start:debug     # Debug + watch mode

# Build
npm run build           # prisma generate + nest build

# Database
npx prisma migrate dev  # Apply pending migrations
npx prisma generate     # Regenerate Prisma client after schema changes

# Tests
npm test                # Unit tests
npm run test:watch      # Watch mode
npm run test:cov        # Coverage
npm run test:e2e        # End-to-end tests

# Code quality
npm run lint            # ESLint with auto-fix
npm run format          # Prettier
```

## API

All routes require a Bearer JWT in the `Authorization` header (issued by Clerk).

| Method | Route | Description |
|---|---|---|
| `POST` | `/users` | Create a user |
| `GET` | `/users/:id` | Get a user |
| `GET` | `/celebrities` | List celebrities |
| `POST` | `/celebrities/search` | Search celebrities |
| `POST` | `/bets` | Create a bet |
| `POST` | `/bets/search` | Search bets |
| `GET` | `/bets/:id` | Get a bet |
| `GET` | `/bets/user/:userId` | Bets by user |
| `GET` | `/bets/circle/:circleId` | Bets by circle |
| `POST` | `/bets/:id/celebrities` | Add a celebrity to a bet |
| `PATCH` | `/bets/:betId/celebrities/:celebrityId/points` | Award points for a celebrity death |
| `GET` | `/bets/:betId/points-history` | Points event history for a bet |
| `POST` | `/circle` | Create a circle |
| `GET` | `/circle/:id` | Get a circle |
| `GET` | `/circle/code/:code` | Find a circle by join code |
| `GET` | `/circle/user/:userId` | Circles for a user |
| `GET` | `/circle/:id/ranking` | Ranking at a given date (`?year=&date=`) |
| `POST` | `/circle/:id/members` | Add a member |
| `DELETE` | `/circle/:id/members/:userId` | Remove a member |
| `GET` | `/activity/circle/:circleId` | Circle activity feed |

## Data model

```
User
 └── Bet (one per user × circle × year)
      └── CelebritiesOnBet (junction: bet ↔ celebrity, holds points cache)
      └── PointsEvent      (append-only scoring log, source of truth for history & ranking)

Circle
 ├── Membership (user roles: ADMIN / MEMBER)
 ├── Bet
 └── CircleActivity (event feed: bet created, celebrity added, points earned, member joined)

Celebrity
 └── CelebritiesOnBet
 └── PointsEvent
```

### Points & ranking

Points use an **event sourcing** pattern:

- `CelebritiesOnBet.points` is a **denormalized cache** for fast reads.
- `PointsEvent` is the **append-only source of truth** — every points update writes here atomically alongside the cache.
- Each event carries a `reason` (`"celebrity_death"` by default, extensible to `"bonus"`, `"correction"`, etc.).

The ranking endpoint (`GET /circle/:id/ranking?year=2026&date=2026-06-01`) computes standings from `PointsEvent` up to the given date. Tiebreakers (in order): most points → most scored deaths → earliest first score.

## Project structure

```
src/
├── auth/               # ClerkAuthGuard
├── prisma/             # PrismaService
└── modules/
    ├── users/
    ├── celebrities/
    ├── bets/           # Full layered architecture (controller → service → repository → mapper)
    ├── circles/
    ├── membership/
    └── activity/       # Event-driven feed via NestJS EventEmitter
prisma/
├── schema.prisma
└── migrations/
generated/
└── prisma/             # Generated Prisma client (@/prisma/*)
```

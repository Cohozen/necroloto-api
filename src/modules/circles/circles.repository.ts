import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCircleDto } from "./dto/create-circle.dto";
import { UpdateCircleDto } from "./dto/update-circle.dto";
import { AddMemberDto } from "./dto/add-member.dto";

const CIRCLE_INCLUDE = {
    memberships: {
        include: {
            user: true
        }
    },
    bets: {
        include: {
            user: true,
            CelebritiesOnBet: {
                include: {
                    celebrity: true
                }
            }
        }
    }
} as const;

@Injectable()
export class CirclesRepository {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateCircleDto) {
        return this.prisma.circle.create({ data: dto, include: CIRCLE_INCLUDE });
    }

    findAll() {
        return this.prisma.circle.findMany({ include: CIRCLE_INCLUDE });
    }

    findById(id: string) {
        return this.prisma.circle.findUnique({ where: { id }, include: CIRCLE_INCLUDE });
    }

    findByCode(code: string) {
        return this.prisma.circle.findFirst({ where: { code }, include: CIRCLE_INCLUDE });
    }

    findByUser(userId: string) {
        return this.prisma.circle.findMany({
            where: { memberships: { some: { userId } } },
            include: CIRCLE_INCLUDE
        });
    }

    update(id: string, dto: UpdateCircleDto) {
        return this.prisma.circle.update({ where: { id }, data: dto, include: CIRCLE_INCLUDE });
    }

    delete(id: string) {
        return this.prisma.circle.delete({ where: { id } });
    }

    addMember(circleId: string, dto: AddMemberDto) {
        return this.prisma.membership.create({
            data: { circleId, userId: dto.userId, role: dto.role || "MEMBER" },
            include: { user: true, circle: true }
        });
    }

    removeMember(circleId: string, userId: string) {
        return this.prisma.membership.delete({
            where: { userId_circleId: { userId, circleId } }
        });
    }

    getRankingData(circleId: string, year: number, date: Date) {
        return this.prisma.bet.findMany({
            where: { circleId, year },
            include: {
                user: true,
                pointsEvents: {
                    where: { createdAt: { lte: date } },
                    orderBy: { createdAt: "asc" }
                }
            }
        });
    }
}

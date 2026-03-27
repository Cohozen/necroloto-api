import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateBetDto } from "./dto/create-bet.dto";
import { UpdateBetDto } from "./dto/update-bet.dto";
import { AddCelebrityToBetDto } from "./dto/add-celebrity-to-bet.dto";
import { UpdatePointsDto } from "./dto/update-points.dto";
import { SearchBetDto } from "./dto/search-bet.dto";

const BET_INCLUDE = {
    user: true,
    Circle: true,
    CelebritiesOnBet: {
        include: {
            celebrity: true
        }
    }
} as const;

@Injectable()
export class BetsRepository {
    constructor(private prisma: PrismaService) {}

    create(createBetDto: CreateBetDto) {
        const { celebrityIds, ...betData } = createBetDto;

        return this.prisma.bet.create({
            data: {
                ...betData,
                CelebritiesOnBet: celebrityIds
                    ? {
                          create: celebrityIds.map((celebrityId) => ({
                              celebrityId
                          }))
                      }
                    : undefined
            },
            include: BET_INCLUDE
        });
    }

    findAll() {
        return this.prisma.bet.findMany({ include: BET_INCLUDE });
    }

    findById(id: string) {
        return this.prisma.bet.findUnique({ where: { id }, include: BET_INCLUDE });
    }

    findByUser(userId: string) {
        return this.prisma.bet.findMany({ where: { userId }, include: BET_INCLUDE });
    }

    findByCircle(circleId: string) {
        return this.prisma.bet.findMany({ where: { circleId }, include: BET_INCLUDE });
    }

    search(searchBetDto: SearchBetDto) {
        const { userId, circleId, year } = searchBetDto;

        return this.prisma.bet.findMany({
            where: {
                ...(userId && { userId }),
                ...(circleId && { circleId }),
                ...(year && { year })
            },
            include: BET_INCLUDE
        });
    }

    update(id: string, updateBetDto: UpdateBetDto) {
        return this.prisma.bet.update({ where: { id }, data: updateBetDto, include: BET_INCLUDE });
    }

    delete(id: string) {
        return this.prisma.bet.delete({ where: { id } });
    }

    addCelebrity(betId: string, dto: AddCelebrityToBetDto) {
        return this.prisma.celebritiesOnBet.create({
            data: { betId, celebrityId: dto.celebrityId },
            include: { bet: true, celebrity: true }
        });
    }

    updateCelebrityPoints(betId: string, celebrityId: string, dto: UpdatePointsDto) {
        return this.prisma.celebritiesOnBet.update({
            where: { betId_celebrityId: { betId, celebrityId } },
            data: { points: dto.points },
            include: { bet: true, celebrity: true }
        });
    }

    removeCelebrity(betId: string, celebrityId: string) {
        return this.prisma.celebritiesOnBet.delete({
            where: { betId_celebrityId: { betId, celebrityId } }
        });
    }
}

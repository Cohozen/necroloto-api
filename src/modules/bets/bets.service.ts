import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateBetDto } from "./dto/create-bet.dto";
import { UpdateBetDto } from "./dto/update-bet.dto";
import { AddCelebrityToBetDto } from "./dto/add-celebrity-to-bet.dto";
import { SearchBetDto } from "./dto/search-bet.dto";
import { UpdatePointsDto } from "./dto/update-points.dto";

@Injectable()
export class BetsService {
    constructor(private prisma: PrismaService) {}

    async create(createBetDto: CreateBetDto) {
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
            include: {
                user: true,
                Circle: true,
                CelebritiesOnBet: {
                    include: {
                        celebrity: true
                    }
                }
            }
        });
    }

    async findAll() {
        return this.prisma.bet.findMany({
            include: {
                user: true,
                Circle: true,
                CelebritiesOnBet: {
                    include: {
                        celebrity: true
                    }
                }
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.bet.findUnique({
            where: { id },
            include: {
                user: true,
                Circle: true,
                CelebritiesOnBet: {
                    include: {
                        celebrity: true
                    }
                }
            }
        });
    }

    async findByUser(userId: string) {
        return this.prisma.bet.findMany({
            where: { userId },
            include: {
                user: true,
                Circle: true,
                CelebritiesOnBet: {
                    include: {
                        celebrity: true
                    }
                }
            }
        });
    }

    async findByCircle(circleId: string) {
        return this.prisma.bet.findMany({
            where: { circleId },
            include: {
                user: true,
                Circle: true,
                CelebritiesOnBet: {
                    include: {
                        celebrity: true
                    }
                }
            }
        });
    }

    async search(searchBetDto: SearchBetDto) {
        const { userId, circleId, year } = searchBetDto;

        return this.prisma.bet.findMany({
            where: {
                ...(userId && { userId }),
                ...(circleId && { circleId }),
                ...(year && { year })
            },
            include: {
                user: true,
                Circle: true,
                CelebritiesOnBet: {
                    include: {
                        celebrity: true
                    }
                }
            }
        });
    }

    async update(id: string, updateBetDto: UpdateBetDto) {
        return this.prisma.bet.update({
            where: { id },
            data: updateBetDto,
            include: {
                user: true,
                Circle: true,
                CelebritiesOnBet: {
                    include: {
                        celebrity: true
                    }
                }
            }
        });
    }

    async addCelebrityToBet(betId: string, dto: AddCelebrityToBetDto) {
        return this.prisma.celebritiesOnBet.create({
            data: {
                betId,
                celebrityId: dto.celebrityId
            },
            include: {
                bet: true,
                celebrity: true
            }
        });
    }

    async updateCelebrityPoints(betId: string, celebrityId: string, dto: UpdatePointsDto) {
        return this.prisma.celebritiesOnBet.update({
            where: {
                betId_celebrityId: {
                    betId,
                    celebrityId
                }
            },
            data: {
                points: dto.points
            },
            include: {
                bet: true,
                celebrity: true
            }
        });
    }

    async removeCelebrityFromBet(betId: string, celebrityId: string) {
        return this.prisma.celebritiesOnBet.delete({
            where: {
                betId_celebrityId: {
                    betId,
                    celebrityId
                }
            }
        });
    }

    async remove(id: string) {
        return this.prisma.bet.delete({
            where: { id }
        });
    }
}

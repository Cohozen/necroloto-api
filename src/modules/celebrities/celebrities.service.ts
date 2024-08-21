import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Celebrity, Prisma } from "@prisma/client";

@Injectable()
export class CelebritiesService {
    constructor(private readonly prisma: PrismaService) {}

    async celebrity(
        celebrityWhereUniqueInput: Prisma.CelebrityWhereUniqueInput
    ): Promise<Celebrity | null> {
        return this.prisma.celebrity.findUnique({
            where: celebrityWhereUniqueInput
        });
    }

    async celebrities(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CelebrityWhereUniqueInput;
        where?: Prisma.CelebrityWhereInput;
        orderBy?: Prisma.CelebrityOrderByWithRelationInput;
        include?: Prisma.CelebrityInclude;
    }): Promise<Celebrity[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.celebrity.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        });
    }

    async createCelebrity(data: Prisma.CelebrityCreateInput): Promise<Celebrity> {
        return this.prisma.celebrity.create({
            data
        });
    }

    async updateCelebrity(params: {
        where: Prisma.CelebrityWhereUniqueInput;
        data: Prisma.CelebrityUpdateInput;
    }): Promise<Celebrity> {
        const { where, data } = params;
        return this.prisma.celebrity.update({
            data,
            where
        });
    }

    async updateCelebritiesOnBet(params: {
        where: Prisma.CelebritiesOnBetWhereInput;
        data: Prisma.CelebritiesOnBetUpdateInput;
    }): Promise<Prisma.BatchPayload> {
        const { where, data } = params;
        return this.prisma.celebritiesOnBet.updateMany({
            data,
            where
        });
    }

    async deleteCelebrity(where: Prisma.CelebrityWhereUniqueInput): Promise<Celebrity> {
        return this.prisma.celebrity.delete({
            where
        });
    }
}

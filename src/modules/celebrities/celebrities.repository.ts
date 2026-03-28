import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCelebrityDto } from "./dto/create-celebrity.dto";
import { UpdateCelebrityDto } from "./dto/update-celebrity.dto";
import { SearchCelebrityDto } from "./dto/search-celebrity.dto";

const CELEBRITY_INCLUDE = {
    CelebritiesOnBet: true
} as const;

@Injectable()
export class CelebritiesRepository {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateCelebrityDto) {
        return this.prisma.celebrity.create({ data: dto, include: CELEBRITY_INCLUDE });
    }

    findAll() {
        return this.prisma.celebrity.findMany({ include: CELEBRITY_INCLUDE });
    }

    findById(id: string) {
        return this.prisma.celebrity.findUnique({ where: { id }, include: CELEBRITY_INCLUDE });
    }

    search(dto: SearchCelebrityDto) {
        const { name, isAlive, birthYear } = dto;

        return this.prisma.celebrity.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(isAlive !== undefined && { death: isAlive ? null : { not: null } }),
                ...(birthYear && {
                    birth: {
                        gte: new Date(`${birthYear}-01-01`),
                        lt: new Date(`${birthYear + 1}-01-01`)
                    }
                })
            },
            include: CELEBRITY_INCLUDE
        });
    }

    update(id: string, dto: UpdateCelebrityDto) {
        return this.prisma.celebrity.update({ where: { id }, data: dto, include: CELEBRITY_INCLUDE });
    }

    delete(id: string) {
        return this.prisma.celebrity.delete({ where: { id } });
    }

    async merge(sourceId: string, targetId: string) {
        await this.prisma.celebritiesOnBet.updateMany({
            where: { celebrityId: sourceId },
            data: { celebrityId: targetId }
        });
        await this.prisma.celebrity.delete({ where: { id: sourceId } });
        return this.prisma.celebrity.findUniqueOrThrow({ where: { id: targetId }, include: CELEBRITY_INCLUDE });
    }
}

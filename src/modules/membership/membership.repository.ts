import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateMembershipDto } from "./dto/create-membership.dto";
import { UpdateMembershipDto } from "./dto/update-membership.dto";
import { SearchMembershipDto } from "./dto/search-membership.dto";

const MEMBERSHIP_INCLUDE = {
    user: true,
    circle: true
} as const;

@Injectable()
export class MembershipRepository {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateMembershipDto) {
        return this.prisma.membership.create({ data: dto, include: MEMBERSHIP_INCLUDE });
    }

    findAll() {
        return this.prisma.membership.findMany({ include: MEMBERSHIP_INCLUDE });
    }

    findById(id: string) {
        return this.prisma.membership.findUnique({ where: { id }, include: MEMBERSHIP_INCLUDE });
    }

    findByUser(userId: string) {
        return this.prisma.membership.findMany({ where: { userId }, include: MEMBERSHIP_INCLUDE });
    }

    findByCircle(circleId: string) {
        return this.prisma.membership.findMany({ where: { circleId }, include: MEMBERSHIP_INCLUDE });
    }

    search(dto: SearchMembershipDto) {
        const { userId, circleId, role } = dto;

        return this.prisma.membership.findMany({
            where: {
                ...(userId && { userId }),
                ...(circleId && { circleId }),
                ...(role && { role })
            },
            include: MEMBERSHIP_INCLUDE
        });
    }

    update(id: string, dto: UpdateMembershipDto) {
        return this.prisma.membership.update({ where: { id }, data: dto, include: MEMBERSHIP_INCLUDE });
    }

    delete(id: string) {
        return this.prisma.membership.delete({ where: { id } });
    }
}

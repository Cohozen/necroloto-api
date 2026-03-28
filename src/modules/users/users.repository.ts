import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

const USER_INCLUDE = {
    Bets: true,
    Membership: true
} as const;

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateUserDto) {
        return this.prisma.user.create({ data: dto, include: USER_INCLUDE });
    }

    findAll() {
        return this.prisma.user.findMany({ include: USER_INCLUDE });
    }

    findById(id: string) {
        return this.prisma.user.findUnique({ where: { id }, include: USER_INCLUDE });
    }

    findByClerkId(clerkId: string) {
        return this.prisma.user.findFirst({ where: { clerkId }, include: USER_INCLUDE });
    }

    update(id: string, dto: UpdateUserDto) {
        return this.prisma.user.update({ where: { id }, data: dto, include: USER_INCLUDE });
    }

    delete(id: string) {
        return this.prisma.user.delete({ where: { id } });
    }
}

import { Injectable } from "@nestjs/common";
import { ActivityType } from "@/prisma/enums";
import { PrismaService } from "../../prisma/prisma.service";

const ACTIVITY_INCLUDE = {
    user: true
} as const;

@Injectable()
export class ActivityRepository {
    constructor(private prisma: PrismaService) {}

    create(data: { circleId: string; userId: string; type: ActivityType; metadata?: object }) {
        return this.prisma.circleActivity.create({ data, include: ACTIVITY_INCLUDE });
    }

    findByCircle(circleId: string, limit: number, cursor?: string) {
        return this.prisma.circleActivity.findMany({
            where: { circleId },
            orderBy: { createdAt: "desc" },
            take: limit + 1,
            ...(cursor && { cursor: { id: cursor }, skip: 1 }),
            include: ACTIVITY_INCLUDE
        });
    }

    countByCircle(circleId: string) {
        return this.prisma.circleActivity.count({ where: { circleId } });
    }

    findUserByClerkId(clerkId: string) {
        return this.prisma.user.findFirst({ where: { clerkId } });
    }

    isMember(circleId: string, userId: string) {
        return this.prisma.membership.findUnique({
            where: { userId_circleId: { userId, circleId } }
        });
    }
}

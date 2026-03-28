import { ForbiddenException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ActivityType } from "@/prisma/enums";
import { ActivityMapper } from "./activity.mapper";
import { ActivityRepository } from "./activity.repository";
import { ActivityPageDto } from "./dto/activity-response.dto";

const DEFAULT_LIMIT = 20;

@Injectable()
export class ActivityService {
    constructor(
        private activityRepository: ActivityRepository,
        private activityMapper: ActivityMapper
    ) {}

    async findByCircle(
        circleId: string,
        clerkId: string,
        limit?: number,
        cursor?: string
    ): Promise<ActivityPageDto> {
        const user = await this.activityRepository.findUserByClerkId(clerkId);
        if (!user) throw new ForbiddenException();

        const membership = await this.activityRepository.isMember(circleId, user.id);
        if (!membership) throw new ForbiddenException();

        const take = limit ?? DEFAULT_LIMIT;
        const [activities, total] = await Promise.all([
            this.activityRepository.findByCircle(circleId, take, cursor),
            this.activityRepository.countByCircle(circleId)
        ]);

        return this.activityMapper.toActivityPage(activities, take, total);
    }

    @OnEvent("bet.created")
    async handleBetCreated(payload: {
        circleId: string;
        userId: string;
        year: number;
        betId: string;
    }) {
        try {
            await this.activityRepository.create({
                circleId: payload.circleId,
                userId: payload.userId,
                type: ActivityType.BET_CREATED,
                metadata: { year: payload.year, betId: payload.betId }
            });
        } catch {}
    }

    @OnEvent("bet.celebrity_added")
    async handleCelebrityAdded(payload: {
        circleId: string;
        userId: string;
        betId: string;
        celebrityId: string;
        celebrityName: string;
    }) {
        try {
            await this.activityRepository.create({
                circleId: payload.circleId,
                userId: payload.userId,
                type: ActivityType.CELEBRITY_ADDED,
                metadata: {
                    betId: payload.betId,
                    celebrityId: payload.celebrityId,
                    celebrityName: payload.celebrityName
                }
            });
        } catch {}
    }

    @OnEvent("bet.points_earned")
    async handlePointsEarned(payload: {
        circleId: string;
        userId: string;
        betId: string;
        celebrityId: string;
        celebrityName: string;
        points: number;
    }) {
        try {
            await this.activityRepository.create({
                circleId: payload.circleId,
                userId: payload.userId,
                type: ActivityType.POINTS_EARNED,
                metadata: {
                    betId: payload.betId,
                    celebrityId: payload.celebrityId,
                    celebrityName: payload.celebrityName,
                    points: payload.points
                }
            });
        } catch {}
    }

    @OnEvent("circle.member_joined")
    async handleMemberJoined(payload: { circleId: string; userId: string; role: string }) {
        try {
            await this.activityRepository.create({
                circleId: payload.circleId,
                userId: payload.userId,
                type: ActivityType.MEMBER_JOINED,
                metadata: { role: payload.role }
            });
        } catch {}
    }
}

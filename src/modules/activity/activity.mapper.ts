import { Injectable } from "@nestjs/common";
import { ActivityRepository } from "./activity.repository";
import { ActivityPageDto, ActivityResponseDto } from "./dto/activity-response.dto";

type ActivityWithRelations = Awaited<ReturnType<ActivityRepository["findByCircle"]>>[number];

@Injectable()
export class ActivityMapper {
    toActivityResponse(activity: ActivityWithRelations): ActivityResponseDto {
        return {
            id: activity.id,
            circleId: activity.circleId,
            userId: activity.userId,
            type: activity.type,
            metadata: activity.metadata as Record<string, unknown> | null,
            createdAt: activity.createdAt,
            user: {
                id: activity.user.id,
                username: activity.user.username,
                firstname: activity.user.firstname,
                lastname: activity.user.lastname,
                image: activity.user.image
            }
        };
    }

    toActivityPage(
        activities: ActivityWithRelations[],
        limit: number,
        total: number
    ): ActivityPageDto {
        const hasNext = activities.length > limit;
        const items = hasNext ? activities.slice(0, limit) : activities;

        return {
            items: items.map((a) => this.toActivityResponse(a)),
            nextCursor: hasNext ? items[items.length - 1].id : null,
            total
        };
    }
}

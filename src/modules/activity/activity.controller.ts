import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ClerkAuthGuard } from "../auth/guards/clerk.auth.guard";
import { ActivityService } from "./activity.service";
import { ActivityPageDto } from "./dto/activity-response.dto";

@ApiTags("activity")
@UseGuards(ClerkAuthGuard)
@Controller("activity")
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {}

    @Get("circle/:circleId")
    @ApiOkResponse({ type: ActivityPageDto })
    findByCircle(
        @Param("circleId") circleId: string,
        @Req() req: any,
        @Query("limit") limit?: string,
        @Query("cursor") cursor?: string
    ): Promise<ActivityPageDto> {
        const parsedLimit = limit ? parseInt(limit, 10) : undefined;
        return this.activityService.findByCircle(circleId, req.user.sub, parsedLimit, cursor);
    }
}

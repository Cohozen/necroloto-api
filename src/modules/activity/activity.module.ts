import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { ActivityController } from "./activity.controller";
import { ActivityMapper } from "./activity.mapper";
import { ActivityRepository } from "./activity.repository";
import { ActivityService } from "./activity.service";

@Module({
    imports: [PrismaModule],
    providers: [ActivityService, ActivityRepository, ActivityMapper],
    controllers: [ActivityController]
})
export class ActivityModule {}

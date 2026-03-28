import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { CirclesService } from "./circles.service";
import { CirclesController } from "./circles.controller";
import { CirclesRepository } from "./circles.repository";
import { CirclesMapper } from "./circles.mapper";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
    imports: [PrismaModule, EventEmitterModule],
    providers: [CirclesService, CirclesRepository, CirclesMapper],
    controllers: [CirclesController],
    exports: [CirclesService]
})
export class CirclesModule {}

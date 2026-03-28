import { Module } from "@nestjs/common";
import { CircleService } from "./circle.service";
import { CircleController } from "./circle.controller";
import { CircleRepository } from "./circle.repository";
import { CircleMapper } from "./circle.mapper";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [CircleService, CircleRepository, CircleMapper],
    controllers: [CircleController],
    exports: [CircleService]
})
export class CircleModule {}

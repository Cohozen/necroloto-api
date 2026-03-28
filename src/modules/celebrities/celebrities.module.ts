import { Module } from "@nestjs/common";
import { CelebritiesService } from "./celebrities.service";
import { CelebritiesController } from "./celebrities.controller";
import { CelebritiesRepository } from "./celebrities.repository";
import { CelebritiesMapper } from "./celebrities.mapper";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [CelebritiesService, CelebritiesRepository, CelebritiesMapper],
    controllers: [CelebritiesController],
    exports: [CelebritiesService]
})
export class CelebritiesModule {}

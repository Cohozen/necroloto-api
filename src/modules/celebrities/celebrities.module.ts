import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { CelebritiesController } from "./celebrities.controller";
import { CelebritiesService } from "./celebrities.service";

@Module({
    imports: [PrismaModule],
    controllers: [CelebritiesController],
    providers: [CelebritiesService]
})
export class CelebritiesModule {}

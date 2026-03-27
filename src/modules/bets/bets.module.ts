import { Module } from "@nestjs/common";
import { BetsService } from "./bets.service";
import { BetsController } from "./bets.controller";
import { BetsRepository } from "./bets.repository";
import { BetsMapper } from "./bets.mapper";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [BetsService, BetsRepository, BetsMapper],
    controllers: [BetsController],
    exports: [BetsService]
})
export class BetsModule {}

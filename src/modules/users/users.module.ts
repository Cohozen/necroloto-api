import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersMapper } from "./users.mapper";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [UsersService, UsersRepository, UsersMapper],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}

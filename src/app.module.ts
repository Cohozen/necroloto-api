import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "./modules/users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CelebritiesModule } from "./modules/celebrities/celebrities.module";

@Module({
    imports: [UsersModule, CelebritiesModule, PrismaModule],
    controllers: [AppController]
})
export class AppModule {}

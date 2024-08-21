import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "./modules/users/users.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
    imports: [UsersModule, PrismaModule],
    controllers: [AppController]
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AppController } from "./app.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";
import { CelebritiesModule } from "./modules/celebrities/celebrities.module";
import { BetsModule } from "./modules/bets/bets.module";
import { CirclesModule } from "./modules/circles/circles.module";
import { MembershipModule } from "./modules/membership/membership.module";
import { ActivityModule } from "./modules/activity/activity.module";

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        PrismaModule,
        UsersModule,
        CelebritiesModule,
        BetsModule,
        CirclesModule,
        MembershipModule,
        ActivityModule
    ],
    controllers: [AppController],
    providers: []
})
export class AppModule {}

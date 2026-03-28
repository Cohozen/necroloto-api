import { Module } from "@nestjs/common";
import { MembershipService } from "./membership.service";
import { MembershipController } from "./membership.controller";
import { MembershipRepository } from "./membership.repository";
import { MembershipMapper } from "./membership.mapper";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [MembershipService, MembershipRepository, MembershipMapper],
    controllers: [MembershipController],
    exports: [MembershipService]
})
export class MembershipModule {}

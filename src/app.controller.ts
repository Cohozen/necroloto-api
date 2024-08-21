import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { User as UserModel } from "@prisma/client";
import { UserService } from "./user.service";
import { ClerkAuthGuard } from "./clerk.auth.guard";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService
    ) {}

    @Get()
    @UseGuards(ClerkAuthGuard)
    getHello(): string {
        return this.appService.getHello();
    }

    @Get("users")
    @UseGuards(ClerkAuthGuard)
    async listUsers(): Promise<UserModel[]> {
        return this.userService.users({});
    }
}

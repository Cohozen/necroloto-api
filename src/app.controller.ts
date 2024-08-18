import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { User as UserModel } from "@prisma/client";
import { UserService } from "./user.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get("users")
    async listUsers(): Promise<UserModel[]> {
        return this.userService.users({});
    }
}

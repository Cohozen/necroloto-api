import { Controller, Get, UseGuards } from "@nestjs/common";
import { User as UserModel } from "@prisma/client";
import { UsersService } from "./users.service";
import { ClerkAuthGuard } from "../clerk.auth.guard";

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get("users")
    @UseGuards(ClerkAuthGuard)
    async listUsers(): Promise<UserModel[]> {
        return this.userService.users({});
    }
}

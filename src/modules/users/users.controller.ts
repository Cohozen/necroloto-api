import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { User as UserModel } from "@prisma/client";
import { UsersService } from "./users.service";
import { ClerkAuthGuard } from "../auth/guards/clerk.auth.guard";

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get("users")
    @UseGuards(ClerkAuthGuard)
    async listUsers(): Promise<UserModel[]> {
        return this.userService.users({});
    }

    @Get(":id")
    @UseGuards(ClerkAuthGuard)
    async getUser(@Param("id") id: string): Promise<UserModel> {
        return this.userService.user({ id });
    }
}

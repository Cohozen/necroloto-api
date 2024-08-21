import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UsersService } from "./users.service";
import { ClerkAuthGuard } from "../auth/guards/clerk.auth.guard";
import { QueryDto } from "../../common/dtos/query.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.user({ id });
    }

    @Get()
    findAll(@Query() query: QueryDto) {
        const { skip, take, orderBy, searchString } = query;

        const or = searchString
            ? {
                  OR: [
                      { firstname: { contains: searchString } },
                      { lastname: { contains: searchString } },
                      { email: { contains: searchString } }
                  ]
              }
            : {};

        return this.userService.users({
            skip: Number(skip) || undefined,
            take: Number(take) || undefined,
            where: {
                ...or
            },
            orderBy: {
                firstname: orderBy
            }
        });
    }

    @Post()
    @UseGuards(ClerkAuthGuard)
    create(@Body() createUserDto: Prisma.UserCreateInput) {
        return this.userService.createUser(createUserDto);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
        return this.userService.updateUser({
            where: { id },
            data: updateUserDto
        });
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userService.deleteUser({
            id
        });
    }
}

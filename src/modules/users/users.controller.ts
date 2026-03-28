import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpCode,
    HttpStatus
} from "@nestjs/common";
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { ClerkAuthGuard } from "../auth/guards/clerk.auth.guard";

@ApiTags("users")
@UseGuards(ClerkAuthGuard)
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({ type: UserResponseDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOkResponse({ type: [UserResponseDto] })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: UserResponseDto })
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(id);
    }

    @Get("clerk/:clerkId")
    @ApiOkResponse({ type: UserResponseDto })
    findByClerkId(@Param("clerkId") clerkId: string) {
        return this.usersService.findByClerkId(clerkId);
    }

    @Patch(":id")
    @ApiOkResponse({ type: UserResponseDto })
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse()
    remove(@Param("id") id: string) {
        return this.usersService.remove(id);
    }
}

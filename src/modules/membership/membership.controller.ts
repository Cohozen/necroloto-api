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
import { MembershipService } from "./membership.service";
import { CreateMembershipDto } from "./dto/create-membership.dto";
import { UpdateMembershipDto } from "./dto/update-membership.dto";
import { SearchMembershipDto } from "./dto/search-membership.dto";
import { MembershipResponseDto } from "./dto/membership-response.dto";
import { ClerkAuthGuard } from "../auth/guards/clerk.auth.guard";

@ApiTags("membership")
@UseGuards(ClerkAuthGuard)
@Controller("membership")
export class MembershipController {
    constructor(private readonly membershipService: MembershipService) {}

    @Post()
    @ApiCreatedResponse({ type: MembershipResponseDto })
    create(@Body() createMembershipDto: CreateMembershipDto) {
        return this.membershipService.create(createMembershipDto);
    }

    @Post("search")
    @ApiOkResponse({ type: [MembershipResponseDto] })
    search(@Body() searchMembershipDto: SearchMembershipDto) {
        return this.membershipService.search(searchMembershipDto);
    }

    @Get()
    @ApiOkResponse({ type: [MembershipResponseDto] })
    findAll() {
        return this.membershipService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: MembershipResponseDto })
    findOne(@Param("id") id: string) {
        return this.membershipService.findOne(id);
    }

    @Get("user/:userId")
    @ApiOkResponse({ type: [MembershipResponseDto] })
    findByUser(@Param("userId") userId: string) {
        return this.membershipService.findByUser(userId);
    }

    @Get("circle/:circleId")
    @ApiOkResponse({ type: [MembershipResponseDto] })
    findByCircle(@Param("circleId") circleId: string) {
        return this.membershipService.findByCircle(circleId);
    }

    @Patch(":id")
    @ApiOkResponse({ type: MembershipResponseDto })
    update(@Param("id") id: string, @Body() updateMembershipDto: UpdateMembershipDto) {
        return this.membershipService.update(id, updateMembershipDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse()
    remove(@Param("id") id: string) {
        return this.membershipService.remove(id);
    }
}

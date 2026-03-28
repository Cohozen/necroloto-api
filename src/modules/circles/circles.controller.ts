import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus
} from "@nestjs/common";
import {
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiQuery,
    ApiTags
} from "@nestjs/swagger";
import { CirclesService } from "./circles.service";
import { CreateCircleDto } from "./dto/create-circle.dto";
import { UpdateCircleDto } from "./dto/update-circle.dto";
import { AddMemberDto } from "./dto/add-member.dto";
import {
    CircleResponseDto,
    MembershipResponseDto,
    RankingResponseDto
} from "./dto/circle-response.dto";
import { ClerkAuthGuard } from "../auth/guards/clerk.auth.guard";

@ApiTags("circle")
@UseGuards(ClerkAuthGuard)
@Controller("circle")
export class CirclesController {
    constructor(private readonly circleService: CirclesService) {}

    @Post()
    @ApiCreatedResponse({ type: CircleResponseDto })
    create(@Body() createCircleDto: CreateCircleDto) {
        return this.circleService.create(createCircleDto);
    }

    @Get()
    @ApiOkResponse({ type: [CircleResponseDto] })
    findAll() {
        return this.circleService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: CircleResponseDto })
    findOne(@Param("id") id: string) {
        return this.circleService.findOne(id);
    }

    @Get("code/:code")
    @ApiOkResponse({ type: CircleResponseDto })
    findByCode(@Param("code") code: string) {
        return this.circleService.findByCode(code);
    }

    @Get("user/:userId")
    @ApiOkResponse({ type: [CircleResponseDto] })
    findByUser(@Param("userId") userId: string) {
        return this.circleService.findByUser(userId);
    }

    @Patch(":id")
    @ApiOkResponse({ type: CircleResponseDto })
    update(@Param("id") id: string, @Body() updateCircleDto: UpdateCircleDto) {
        return this.circleService.update(id, updateCircleDto);
    }

    @Post(":id/members")
    @ApiCreatedResponse({ type: MembershipResponseDto })
    addMember(@Param("id") id: string, @Body() dto: AddMemberDto) {
        return this.circleService.addMember(id, dto);
    }

    @Get(":id/ranking")
    @ApiOkResponse({ type: RankingResponseDto })
    @ApiQuery({ name: "year", type: Number })
    @ApiQuery({
        name: "date",
        required: false,
        type: String,
        description: "ISO date string (defaults to now)"
    })
    getRanking(@Param("id") id: string, @Query("year") year: string, @Query("date") date?: string) {
        return this.circleService.getRanking(
            id,
            parseInt(year, 10),
            date ? new Date(date) : new Date()
        );
    }

    @Delete(":id/members/:userId")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse()
    removeMember(@Param("id") id: string, @Param("userId") userId: string) {
        return this.circleService.removeMember(id, userId);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse()
    remove(@Param("id") id: string) {
        return this.circleService.remove(id);
    }
}

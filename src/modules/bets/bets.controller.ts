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
import { BetsService } from "./bets.service";
import { BetResponseDto, CelebrityOnBetResponseDto } from "./dto/bet-response.dto";
import { CreateBetDto } from "./dto/create-bet.dto";
import { UpdateBetDto } from "./dto/update-bet.dto";
import { AddCelebrityToBetDto } from "./dto/add-celebrity-to-bet.dto";
import { SearchBetDto } from "./dto/search-bet.dto";
import { UpdatePointsDto } from "./dto/update-points.dto";
import { ClerkAuthGuard } from "../auth/guards/clerk.auth.guard";

@ApiTags("bets")
@UseGuards(ClerkAuthGuard)
@Controller("bets")
export class BetsController {
    constructor(private readonly betsService: BetsService) {}

    @Post()
    @ApiCreatedResponse({ type: BetResponseDto })
    create(@Body() createBetDto: CreateBetDto) {
        return this.betsService.create(createBetDto);
    }

    @Post("search")
    @ApiOkResponse({ type: [BetResponseDto] })
    search(@Body() searchBetDto: SearchBetDto) {
        return this.betsService.search(searchBetDto);
    }

    @Get()
    @ApiOkResponse({ type: [BetResponseDto] })
    findAll() {
        return this.betsService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: BetResponseDto })
    findOne(@Param("id") id: string) {
        return this.betsService.findOne(id);
    }

    @Get("user/:userId")
    @ApiOkResponse({ type: [BetResponseDto] })
    findByUser(@Param("userId") userId: string) {
        return this.betsService.findByUser(userId);
    }

    @Get("circle/:circleId")
    @ApiOkResponse({ type: [BetResponseDto] })
    findByCircle(@Param("circleId") circleId: string) {
        return this.betsService.findByCircle(circleId);
    }

    @Patch(":id")
    @ApiOkResponse({ type: BetResponseDto })
    update(@Param("id") id: string, @Body() updateBetDto: UpdateBetDto) {
        return this.betsService.update(id, updateBetDto);
    }

    @Post(":id/celebrities")
    @ApiCreatedResponse({ type: CelebrityOnBetResponseDto })
    addCelebrityToBet(@Param("id") id: string, @Body() dto: AddCelebrityToBetDto) {
        return this.betsService.addCelebrityToBet(id, dto);
    }

    @Patch(":betId/celebrities/:celebrityId/points")
    @ApiOkResponse({ type: CelebrityOnBetResponseDto })
    updateCelebrityPoints(
        @Param("betId") betId: string,
        @Param("celebrityId") celebrityId: string,
        @Body() dto: UpdatePointsDto
    ) {
        return this.betsService.updateCelebrityPoints(betId, celebrityId, dto);
    }

    @Delete(":id/celebrities/:celebrityId")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse()
    removeCelebrityFromBet(@Param("id") id: string, @Param("celebrityId") celebrityId: string) {
        return this.betsService.removeCelebrityFromBet(id, celebrityId);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse()
    remove(@Param("id") id: string) {
        return this.betsService.remove(id);
    }
}

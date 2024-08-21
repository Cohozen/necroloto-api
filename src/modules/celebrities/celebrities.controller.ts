import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ClerkAuthGuard } from "../auth/guards/clerk.auth.guard";
import { QueryDto } from "../../common/dtos/query.dto";
import { CelebritiesService } from "./celebrities.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("celebrities")
@Controller("celebrities")
export class CelebritiesController {
    constructor(private readonly celebritiesService: CelebritiesService) {}

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.celebritiesService.celebrity({ id });
    }

    @Get()
    findAll(@Query() query: QueryDto) {
        const { skip, take, orderBy, searchString } = query;

        const where = searchString ? { name: { contains: searchString } } : {};

        return this.celebritiesService.celebrities({
            skip: Number(skip) || undefined,
            take: Number(take) || undefined,
            where: {
                ...where
            },
            orderBy: {
                name: orderBy
            }
        });
    }

    @Post()
    @UseGuards(ClerkAuthGuard)
    create(@Body() createCelebrityDto: Prisma.CelebrityCreateInput) {
        return this.celebritiesService.createCelebrity(createCelebrityDto);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateCelebrityDto: Prisma.CelebrityUpdateInput) {
        return this.celebritiesService.updateCelebrity({
            where: { id },
            data: updateCelebrityDto
        });
    }

    @Put(":id/bets")
    updateCelebritiesOnBet(
        @Param("id") id: string,
        @Body() updateCelebritiesOnBetDto: Prisma.CelebritiesOnBetUpdateInput
    ) {
        return this.celebritiesService.updateCelebritiesOnBet({
            where: { celebrityId: id },
            data: updateCelebritiesOnBetDto
        });
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.celebritiesService.deleteCelebrity({
            id
        });
    }
}

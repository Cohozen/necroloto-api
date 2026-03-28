import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CelebritiesService } from "./celebrities.service";
import { CreateCelebrityDto } from "./dto/create-celebrity.dto";
import { UpdateCelebrityDto } from "./dto/update-celebrity.dto";
import { SearchCelebrityDto } from "./dto/search-celebrity.dto";
import { CelebrityResponseDto } from "./dto/celebrity-response.dto";
import { ClerkAuthGuard } from "../auth/guards/clerk.auth.guard";

@ApiTags("celebrities")
@UseGuards(ClerkAuthGuard)
@Controller("celebrities")
export class CelebritiesController {
    constructor(private readonly celebritiesService: CelebritiesService) {}

    @Post()
    @ApiCreatedResponse({ type: CelebrityResponseDto })
    create(@Body() createCelebrityDto: CreateCelebrityDto) {
        return this.celebritiesService.create(createCelebrityDto);
    }

    @Post("search")
    @ApiOkResponse({ type: [CelebrityResponseDto] })
    search(@Body() searchCelebrityDto: SearchCelebrityDto) {
        return this.celebritiesService.search(searchCelebrityDto);
    }

    @Post(":sourceId/merge/:targetId")
    @ApiOkResponse({ type: CelebrityResponseDto })
    merge(@Param("sourceId") sourceId: string, @Param("targetId") targetId: string) {
        return this.celebritiesService.merge(sourceId, targetId);
    }

    @Get()
    @ApiOkResponse({ type: [CelebrityResponseDto] })
    findAll() {
        return this.celebritiesService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: CelebrityResponseDto })
    findOne(@Param("id") id: string) {
        return this.celebritiesService.findOne(id);
    }

    @Patch(":id")
    @ApiOkResponse({ type: CelebrityResponseDto })
    update(@Param("id") id: string, @Body() updateCelebrityDto: UpdateCelebrityDto) {
        return this.celebritiesService.update(id, updateCelebrityDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse()
    remove(@Param("id") id: string) {
        return this.celebritiesService.remove(id);
    }
}

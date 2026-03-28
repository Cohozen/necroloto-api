import { Injectable } from "@nestjs/common";
import { CelebritiesRepository } from "./celebrities.repository";
import { CelebritiesMapper } from "./celebrities.mapper";
import { CelebrityResponseDto } from "./dto/celebrity-response.dto";
import { CreateCelebrityDto } from "./dto/create-celebrity.dto";
import { UpdateCelebrityDto } from "./dto/update-celebrity.dto";
import { SearchCelebrityDto } from "./dto/search-celebrity.dto";

@Injectable()
export class CelebritiesService {
    constructor(
        private celebritiesRepository: CelebritiesRepository,
        private celebritiesMapper: CelebritiesMapper
    ) {}

    async create(dto: CreateCelebrityDto): Promise<CelebrityResponseDto> {
        const celebrity = await this.celebritiesRepository.create(dto);
        return this.celebritiesMapper.toCelebrityResponse(celebrity);
    }

    async findAll(): Promise<CelebrityResponseDto[]> {
        const celebrities = await this.celebritiesRepository.findAll();
        return this.celebritiesMapper.toCelebrityResponseList(celebrities);
    }

    async findOne(id: string): Promise<CelebrityResponseDto | null> {
        const celebrity = await this.celebritiesRepository.findById(id);
        return celebrity ? this.celebritiesMapper.toCelebrityResponse(celebrity) : null;
    }

    async search(dto: SearchCelebrityDto): Promise<CelebrityResponseDto[]> {
        const celebrities = await this.celebritiesRepository.search(dto);
        return this.celebritiesMapper.toCelebrityResponseList(celebrities);
    }

    async update(id: string, dto: UpdateCelebrityDto): Promise<CelebrityResponseDto> {
        const celebrity = await this.celebritiesRepository.update(id, dto);
        return this.celebritiesMapper.toCelebrityResponse(celebrity);
    }

    async remove(id: string): Promise<void> {
        await this.celebritiesRepository.delete(id);
    }

    async merge(sourceId: string, targetId: string): Promise<CelebrityResponseDto> {
        const celebrity = await this.celebritiesRepository.merge(sourceId, targetId);
        return this.celebritiesMapper.toCelebrityResponse(celebrity);
    }
}

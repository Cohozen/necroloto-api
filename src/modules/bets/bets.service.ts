import { Injectable } from "@nestjs/common";
import { BetsRepository } from "./bets.repository";
import { BetsMapper } from "./bets.mapper";
import { BetResponseDto, CelebrityOnBetResponseDto } from "./dto/bet-response.dto";
import { CreateBetDto } from "./dto/create-bet.dto";
import { UpdateBetDto } from "./dto/update-bet.dto";
import { AddCelebrityToBetDto } from "./dto/add-celebrity-to-bet.dto";
import { SearchBetDto } from "./dto/search-bet.dto";
import { UpdatePointsDto } from "./dto/update-points.dto";

@Injectable()
export class BetsService {
    constructor(
        private betsRepository: BetsRepository,
        private betsMapper: BetsMapper
    ) {}

    async create(createBetDto: CreateBetDto): Promise<BetResponseDto> {
        const bet = await this.betsRepository.create(createBetDto);
        return this.betsMapper.toBetResponse(bet);
    }

    async findAll(): Promise<BetResponseDto[]> {
        const bets = await this.betsRepository.findAll();
        return this.betsMapper.toBetResponseList(bets);
    }

    async findOne(id: string): Promise<BetResponseDto | null> {
        const bet = await this.betsRepository.findById(id);
        return bet ? this.betsMapper.toBetResponse(bet) : null;
    }

    async findByUser(userId: string): Promise<BetResponseDto[]> {
        const bets = await this.betsRepository.findByUser(userId);
        return this.betsMapper.toBetResponseList(bets);
    }

    async findByCircle(circleId: string): Promise<BetResponseDto[]> {
        const bets = await this.betsRepository.findByCircle(circleId);
        return this.betsMapper.toBetResponseList(bets);
    }

    async search(searchBetDto: SearchBetDto): Promise<BetResponseDto[]> {
        const bets = await this.betsRepository.search(searchBetDto);
        return this.betsMapper.toBetResponseList(bets);
    }

    async update(id: string, updateBetDto: UpdateBetDto): Promise<BetResponseDto> {
        const bet = await this.betsRepository.update(id, updateBetDto);
        return this.betsMapper.toBetResponse(bet);
    }

    async addCelebrityToBet(betId: string, dto: AddCelebrityToBetDto): Promise<CelebrityOnBetResponseDto> {
        const entry = await this.betsRepository.addCelebrity(betId, dto);
        return this.betsMapper.toCelebrityOnBetResponse(entry);
    }

    async updateCelebrityPoints(
        betId: string,
        celebrityId: string,
        dto: UpdatePointsDto
    ): Promise<CelebrityOnBetResponseDto> {
        const entry = await this.betsRepository.updateCelebrityPoints(betId, celebrityId, dto);
        return this.betsMapper.toCelebrityOnBetResponse(entry);
    }

    async removeCelebrityFromBet(betId: string, celebrityId: string): Promise<void> {
        await this.betsRepository.removeCelebrity(betId, celebrityId);
    }

    async remove(id: string): Promise<void> {
        await this.betsRepository.delete(id);
    }
}

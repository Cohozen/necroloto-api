import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CirclesRepository } from "./circles.repository";
import { CirclesMapper } from "./circles.mapper";
import { CircleResponseDto, MembershipResponseDto, RankingResponseDto } from "./dto/circle-response.dto";
import { CreateCircleDto } from "./dto/create-circle.dto";
import { UpdateCircleDto } from "./dto/update-circle.dto";
import { AddMemberDto } from "./dto/add-member.dto";

@Injectable()
export class CirclesService {
    constructor(
        private circleRepository: CirclesRepository,
        private circleMapper: CirclesMapper,
        private eventEmitter: EventEmitter2
    ) {}

    async create(dto: CreateCircleDto): Promise<CircleResponseDto> {
        const circle = await this.circleRepository.create(dto);
        return this.circleMapper.toCircleResponse(circle);
    }
    async findAll(): Promise<CircleResponseDto[]> {
        const circles = await this.circleRepository.findAll();
        return this.circleMapper.toCircleResponseList(circles);
    }

    async findOne(id: string): Promise<CircleResponseDto | null> {
        const circle = await this.circleRepository.findById(id);
        return circle ? this.circleMapper.toCircleResponse(circle) : null;
    }

    async findByCode(code: string): Promise<CircleResponseDto | null> {
        const circle = await this.circleRepository.findByCode(code);
        return circle ? this.circleMapper.toCircleResponse(circle) : null;
    }

    async findByUser(userId: string): Promise<CircleResponseDto[]> {
        const circles = await this.circleRepository.findByUser(userId);
        return this.circleMapper.toCircleResponseList(circles);
    }

    async update(id: string, dto: UpdateCircleDto): Promise<CircleResponseDto> {
        const circle = await this.circleRepository.update(id, dto);
        return this.circleMapper.toCircleResponse(circle);
    }

    async addMember(circleId: string, dto: AddMemberDto): Promise<MembershipResponseDto> {
        const membership = await this.circleRepository.addMember(circleId, dto);
        this.eventEmitter.emit("circle.member_joined", {
            circleId,
            userId: dto.userId,
            role: membership.role
        });
        return this.circleMapper.toMembershipResponse(membership);
    }

    async removeMember(circleId: string, userId: string): Promise<void> {
        await this.circleRepository.removeMember(circleId, userId);
    }

    async getRanking(circleId: string, year: number, date: Date): Promise<RankingResponseDto> {
        const bets = await this.circleRepository.getRankingData(circleId, year, date);
        const entries = bets
            .map((bet) => this.circleMapper.toRankingEntry(bet))
            .sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                if (b.deathCount !== a.deathCount) return b.deathCount - a.deathCount;
                if (a.firstScoredAt && b.firstScoredAt)
                    return a.firstScoredAt.getTime() - b.firstScoredAt.getTime();
                return 0;
            })
            .map(({ firstScoredAt: _, ...entry }, i) => ({ ...entry, rank: i + 1 }));

        return { circleId, year, date, entries };
    }

    async remove(id: string): Promise<void> {
        await this.circleRepository.delete(id);
    }
}

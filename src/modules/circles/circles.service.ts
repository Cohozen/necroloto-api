import { Injectable } from "@nestjs/common";
import { CirclesRepository } from "./circles.repository";
import { CirclesMapper } from "./circles.mapper";
import { CircleResponseDto, MembershipResponseDto } from "./dto/circle-response.dto";
import { CreateCircleDto } from "./dto/create-circle.dto";
import { UpdateCircleDto } from "./dto/update-circle.dto";
import { AddMemberDto } from "./dto/add-member.dto";

@Injectable()
export class CirclesService {
    constructor(
        private circleRepository: CirclesRepository,
        private circleMapper: CirclesMapper
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
        return this.circleMapper.toMembershipResponse(membership);
    }

    async removeMember(circleId: string, userId: string): Promise<void> {
        await this.circleRepository.removeMember(circleId, userId);
    }

    async remove(id: string): Promise<void> {
        await this.circleRepository.delete(id);
    }
}

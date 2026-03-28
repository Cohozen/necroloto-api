import { Injectable } from "@nestjs/common";
import { MembershipRepository } from "./membership.repository";
import { MembershipMapper } from "./membership.mapper";
import { MembershipResponseDto } from "./dto/membership-response.dto";
import { CreateMembershipDto } from "./dto/create-membership.dto";
import { UpdateMembershipDto } from "./dto/update-membership.dto";
import { SearchMembershipDto } from "./dto/search-membership.dto";

@Injectable()
export class MembershipService {
    constructor(
        private membershipRepository: MembershipRepository,
        private membershipMapper: MembershipMapper
    ) {}

    async create(dto: CreateMembershipDto): Promise<MembershipResponseDto> {
        const membership = await this.membershipRepository.create(dto);
        return this.membershipMapper.toMembershipResponse(membership);
    }

    async findAll(): Promise<MembershipResponseDto[]> {
        const memberships = await this.membershipRepository.findAll();
        return this.membershipMapper.toMembershipResponseList(memberships);
    }

    async findOne(id: string): Promise<MembershipResponseDto | null> {
        const membership = await this.membershipRepository.findById(id);
        return membership ? this.membershipMapper.toMembershipResponse(membership) : null;
    }

    async findByUser(userId: string): Promise<MembershipResponseDto[]> {
        const memberships = await this.membershipRepository.findByUser(userId);
        return this.membershipMapper.toMembershipResponseList(memberships);
    }

    async findByCircle(circleId: string): Promise<MembershipResponseDto[]> {
        const memberships = await this.membershipRepository.findByCircle(circleId);
        return this.membershipMapper.toMembershipResponseList(memberships);
    }

    async search(dto: SearchMembershipDto): Promise<MembershipResponseDto[]> {
        const memberships = await this.membershipRepository.search(dto);
        return this.membershipMapper.toMembershipResponseList(memberships);
    }

    async update(id: string, dto: UpdateMembershipDto): Promise<MembershipResponseDto> {
        const membership = await this.membershipRepository.update(id, dto);
        return this.membershipMapper.toMembershipResponse(membership);
    }

    async remove(id: string): Promise<void> {
        await this.membershipRepository.delete(id);
    }
}

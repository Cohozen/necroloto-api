import { Injectable } from "@nestjs/common";
import { MembershipRepository } from "./membership.repository";
import { MembershipResponseDto } from "./dto/membership-response.dto";

type MembershipWithRelations = Awaited<ReturnType<MembershipRepository["findAll"]>>[number];

@Injectable()
export class MembershipMapper {
    toMembershipResponse(membership: MembershipWithRelations): MembershipResponseDto {
        return {
            id: membership.id,
            userId: membership.userId,
            circleId: membership.circleId,
            role: membership.role,
            joinedAt: membership.joinedAt,
            user: {
                id: membership.user.id,
                clerkId: membership.user.clerkId,
                email: membership.user.email,
                username: membership.user.username,
                firstname: membership.user.firstname,
                lastname: membership.user.lastname,
                image: membership.user.image
            },
            circle: {
                id: membership.circle.id,
                name: membership.circle.name,
                visibility: membership.circle.visibility,
                status: membership.circle.status,
                code: membership.circle.code,
                allowNewBet: membership.circle.allowNewBet,
                createdAt: membership.circle.createdAt,
                updatedAt: membership.circle.updatedAt
            }
        };
    }

    toMembershipResponseList(memberships: MembershipWithRelations[]): MembershipResponseDto[] {
        return memberships.map((m) => this.toMembershipResponse(m));
    }
}

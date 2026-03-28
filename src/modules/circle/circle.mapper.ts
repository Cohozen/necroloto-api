import { Injectable } from "@nestjs/common";
import { CircleRepository } from "./circle.repository";
import { CircleResponseDto, MembershipResponseDto } from "./dto/circle-response.dto";

type CircleWithRelations = Awaited<ReturnType<CircleRepository["findAll"]>>[number];
type MembershipWithRelations = Awaited<ReturnType<CircleRepository["addMember"]>>;

@Injectable()
export class CircleMapper {
    toCircleResponse(circle: CircleWithRelations): CircleResponseDto {
        return {
            id: circle.id,
            name: circle.name,
            visibility: circle.visibility,
            status: circle.status,
            code: circle.code,
            allowNewBet: circle.allowNewBet,
            createdAt: circle.createdAt,
            updatedAt: circle.updatedAt,
            memberships: circle.memberships.map((m) => ({
                id: m.id,
                userId: m.userId,
                circleId: m.circleId,
                role: m.role,
                joinedAt: m.joinedAt,
                user: {
                    id: m.user.id,
                    clerkId: m.user.clerkId,
                    email: m.user.email,
                    username: m.user.username,
                    firstname: m.user.firstname,
                    lastname: m.user.lastname,
                    image: m.user.image
                }
            })),
            bets: circle.bets.map((bet) => ({
                id: bet.id,
                userId: bet.userId,
                circleId: bet.circleId,
                year: bet.year,
                createdAt: bet.createdAt,
                updatedAt: bet.updatedAt,
                user: {
                    id: bet.user.id,
                    clerkId: bet.user.clerkId,
                    email: bet.user.email,
                    username: bet.user.username,
                    firstname: bet.user.firstname,
                    lastname: bet.user.lastname,
                    image: bet.user.image
                },
                CelebritiesOnBet: bet.CelebritiesOnBet.map((entry) => ({
                    betId: entry.betId,
                    celebrityId: entry.celebrityId,
                    points: entry.points,
                    celebrity: {
                        id: entry.celebrity.id,
                        name: entry.celebrity.name,
                        birth: entry.celebrity.birth,
                        death: entry.celebrity.death,
                        photo: entry.celebrity.photo
                    }
                }))
            }))
        };
    }

    toCircleResponseList(circles: CircleWithRelations[]): CircleResponseDto[] {
        return circles.map((c) => this.toCircleResponse(c));
    }

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
                code: membership.circle.code
            }
        };
    }
}

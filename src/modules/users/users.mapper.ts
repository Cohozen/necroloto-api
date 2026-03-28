import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UserResponseDto } from "./dto/user-response.dto";

type UserWithRelations = Awaited<ReturnType<UsersRepository["findAll"]>>[number];

@Injectable()
export class UsersMapper {
    toUserResponse(user: UserWithRelations): UserResponseDto {
        return {
            id: user.id,
            clerkId: user.clerkId,
            email: user.email,
            image: user.image,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            clerkCreatedAt: user.clerkCreatedAt,
            clerkUpdatedAt: user.clerkUpdatedAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            Bets: user.Bets.map((bet) => ({
                id: bet.id,
                userId: bet.userId,
                circleId: bet.circleId,
                year: bet.year,
                createdAt: bet.createdAt,
                updatedAt: bet.updatedAt
            })),
            Membership: user.Membership.map((m) => ({
                id: m.id,
                userId: m.userId,
                circleId: m.circleId,
                role: m.role,
                joinedAt: m.joinedAt
            }))
        };
    }

    toUserResponseList(users: UserWithRelations[]): UserResponseDto[] {
        return users.map((u) => this.toUserResponse(u));
    }
}

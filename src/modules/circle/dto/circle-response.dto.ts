import { ApiProperty } from "@nestjs/swagger";
import { CircleStatus, CircleVisibility, MembershipRole } from "@/prisma/client";

export class UserInCircleDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    clerkId: string;

    @ApiProperty({ nullable: true })
    email: string | null;

    @ApiProperty({ nullable: true })
    username: string | null;

    @ApiProperty({ nullable: true })
    firstname: string | null;

    @ApiProperty({ nullable: true })
    lastname: string | null;

    @ApiProperty({ nullable: true })
    image: string | null;
}

export class MembershipInCircleDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    circleId: string;

    @ApiProperty({ enum: MembershipRole })
    role: MembershipRole;

    @ApiProperty()
    joinedAt: Date;

    @ApiProperty({ type: () => UserInCircleDto })
    user: UserInCircleDto;
}

export class CelebrityInBetDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ nullable: true })
    birth: Date | null;

    @ApiProperty({ nullable: true })
    death: Date | null;

    @ApiProperty({ nullable: true })
    photo: string | null;
}

export class CelebrityOnBetInCircleDto {
    @ApiProperty()
    betId: string;

    @ApiProperty()
    celebrityId: string;

    @ApiProperty()
    points: number;

    @ApiProperty({ type: () => CelebrityInBetDto })
    celebrity: CelebrityInBetDto;
}

export class BetInCircleDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({ nullable: true })
    circleId: string | null;

    @ApiProperty()
    year: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: () => UserInCircleDto })
    user: UserInCircleDto;

    @ApiProperty({ type: () => [CelebrityOnBetInCircleDto] })
    CelebritiesOnBet: CelebrityOnBetInCircleDto[];
}

export class CircleResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ enum: CircleVisibility })
    visibility: CircleVisibility;

    @ApiProperty({ enum: CircleStatus })
    status: CircleStatus;

    @ApiProperty({ nullable: true })
    code: string | null;

    @ApiProperty()
    allowNewBet: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: () => [MembershipInCircleDto] })
    memberships: MembershipInCircleDto[];

    @ApiProperty({ type: () => [BetInCircleDto] })
    bets: BetInCircleDto[];
}

export class CircleInMembershipDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ enum: CircleVisibility })
    visibility: CircleVisibility;

    @ApiProperty({ enum: CircleStatus })
    status: CircleStatus;

    @ApiProperty({ nullable: true })
    code: string | null;
}

export class MembershipResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    circleId: string;

    @ApiProperty({ enum: MembershipRole })
    role: MembershipRole;

    @ApiProperty()
    joinedAt: Date;

    @ApiProperty({ type: () => UserInCircleDto })
    user: UserInCircleDto;

    @ApiProperty({ type: () => CircleInMembershipDto })
    circle: CircleInMembershipDto;
}

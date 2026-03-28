import { ApiProperty } from "@nestjs/swagger";
import { MembershipRole } from "@/prisma/client";

export class BetInUserDto {
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
}

export class MembershipInUserDto {
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
}

export class UserResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    clerkId: string;

    @ApiProperty({ nullable: true })
    email: string | null;

    @ApiProperty({ nullable: true })
    image: string | null;

    @ApiProperty({ nullable: true })
    username: string | null;

    @ApiProperty({ nullable: true })
    firstname: string | null;

    @ApiProperty({ nullable: true })
    lastname: string | null;

    @ApiProperty()
    clerkCreatedAt: Date;

    @ApiProperty()
    clerkUpdatedAt: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: () => [BetInUserDto] })
    Bets: BetInUserDto[];

    @ApiProperty({ type: () => [MembershipInUserDto] })
    Membership: MembershipInUserDto[];
}

import { ApiProperty } from "@nestjs/swagger";
import { CircleStatus, CircleVisibility, MembershipRole } from "@/prisma/client";

export class UserInMembershipDto {
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

    @ApiProperty()
    allowNewBet: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
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

    @ApiProperty({ type: () => UserInMembershipDto })
    user: UserInMembershipDto;

    @ApiProperty({ type: () => CircleInMembershipDto })
    circle: CircleInMembershipDto;
}

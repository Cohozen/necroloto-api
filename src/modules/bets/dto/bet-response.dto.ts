import { ApiProperty } from "@nestjs/swagger";
import { CircleStatus, CircleVisibility } from "@/prisma/client";

export class UserInBetDto {
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

export class CircleInBetDto {
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

export class CelebrityOnBetDto {
    @ApiProperty()
    betId: string;

    @ApiProperty()
    celebrityId: string;

    @ApiProperty()
    points: number;

    @ApiProperty({ type: () => CelebrityInBetDto })
    celebrity: CelebrityInBetDto;
}

export class BetResponseDto {
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

    @ApiProperty({ type: () => UserInBetDto })
    user: UserInBetDto;

    @ApiProperty({ type: () => CircleInBetDto, nullable: true })
    Circle: CircleInBetDto | null;

    @ApiProperty({ type: () => [CelebrityOnBetDto] })
    CelebritiesOnBet: CelebrityOnBetDto[];
}

export class CelebrityOnBetResponseDto {
    @ApiProperty()
    betId: string;

    @ApiProperty()
    celebrityId: string;

    @ApiProperty()
    points: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: () => CelebrityInBetDto })
    celebrity: CelebrityInBetDto;
}

export class PointsEventResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    betId: string;

    @ApiProperty()
    celebrityId: string;

    @ApiProperty()
    points: number;

    @ApiProperty()
    reason: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ type: () => CelebrityInBetDto })
    celebrity: CelebrityInBetDto;
}

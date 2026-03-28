import { ApiProperty } from "@nestjs/swagger";

export class CelebrityOnBetInCelebrityDto {
    @ApiProperty()
    betId: string;

    @ApiProperty()
    celebrityId: string;

    @ApiProperty()
    points: number;
}

export class CelebrityResponseDto {
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

    @ApiProperty({ type: () => [CelebrityOnBetInCelebrityDto] })
    CelebritiesOnBet: CelebrityOnBetInCelebrityDto[];
}

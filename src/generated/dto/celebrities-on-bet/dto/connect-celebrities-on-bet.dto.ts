import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

export class CelebritiesOnBetBetIdCelebrityIdUniqueInputDto {
    @ApiProperty({
        type: "string"
    })
    betId: string;
    @ApiProperty({
        type: "string"
    })
    celebrityId: string;
}

@ApiExtraModels(CelebritiesOnBetBetIdCelebrityIdUniqueInputDto)
export class ConnectCelebritiesOnBetDto {
    @ApiProperty({
        type: CelebritiesOnBetBetIdCelebrityIdUniqueInputDto
    })
    betId_celebrityId: CelebritiesOnBetBetIdCelebrityIdUniqueInputDto;
}

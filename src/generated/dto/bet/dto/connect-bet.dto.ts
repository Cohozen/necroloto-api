import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

export class BetUserIdCircleIdYearUniqueInputDto {
    @ApiProperty({
        type: "string"
    })
    userId: string;
    @ApiProperty({
        type: "string"
    })
    circleId: string;
    @ApiProperty({
        type: "integer",
        format: "int32"
    })
    year: number;
}

@ApiExtraModels(BetUserIdCircleIdYearUniqueInputDto)
export class ConnectBetDto {
    @ApiProperty({
        type: "string",
        required: false
    })
    id?: string;
    @ApiProperty({
        type: BetUserIdCircleIdYearUniqueInputDto,
        required: false
    })
    userId_circleId_year?: BetUserIdCircleIdYearUniqueInputDto;
}

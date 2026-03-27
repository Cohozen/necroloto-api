import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { ConnectCelebritiesOnBetDto } from "../../celebrities-on-bet/dto/connect-celebrities-on-bet.dto";

export class CreateCelebrityCelebritiesOnBetRelationInputDto {
    @ApiProperty({
        type: ConnectCelebritiesOnBetDto,
        isArray: true
    })
    connect: ConnectCelebritiesOnBetDto[];
}

@ApiExtraModels(ConnectCelebritiesOnBetDto, CreateCelebrityCelebritiesOnBetRelationInputDto)
export class CreateCelebrityDto {
    @ApiProperty({
        type: "string"
    })
    name: string;
    @ApiProperty({
        type: "string",
        format: "date-time",
        required: false,
        nullable: true
    })
    birth?: Date | null;
    @ApiProperty({
        type: "string",
        format: "date-time",
        required: false,
        nullable: true
    })
    death?: Date | null;
    @ApiProperty({
        type: "string",
        required: false,
        nullable: true
    })
    photo?: string | null;
    @ApiProperty({
        required: false,
        type: CreateCelebrityCelebritiesOnBetRelationInputDto
    })
    CelebritiesOnBet?: CreateCelebrityCelebritiesOnBetRelationInputDto;
}

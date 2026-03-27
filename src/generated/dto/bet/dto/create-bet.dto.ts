import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { ConnectUserDto } from "../../user/dto/connect-user.dto";
import { ConnectCircleDto } from "../../circle/dto/connect-circle.dto";
import { ConnectCelebritiesOnBetDto } from "../../celebrities-on-bet/dto/connect-celebrities-on-bet.dto";

export class CreateBetUserRelationInputDto {
    @ApiProperty({
        type: ConnectUserDto
    })
    connect: ConnectUserDto;
}
export class CreateBetCircleRelationInputDto {
    @ApiProperty({
        type: ConnectCircleDto
    })
    connect: ConnectCircleDto;
}
export class CreateBetCelebritiesOnBetRelationInputDto {
    @ApiProperty({
        type: ConnectCelebritiesOnBetDto,
        isArray: true
    })
    connect: ConnectCelebritiesOnBetDto[];
}

@ApiExtraModels(
    ConnectUserDto,
    CreateBetUserRelationInputDto,
    ConnectCircleDto,
    CreateBetCircleRelationInputDto,
    ConnectCelebritiesOnBetDto,
    CreateBetCelebritiesOnBetRelationInputDto
)
export class CreateBetDto {
    @ApiProperty({
        type: "integer",
        format: "int32"
    })
    year: number;
    @ApiProperty({
        type: CreateBetUserRelationInputDto
    })
    user: CreateBetUserRelationInputDto;
    @ApiProperty({
        required: false,
        type: CreateBetCircleRelationInputDto
    })
    Circle?: CreateBetCircleRelationInputDto;
    @ApiProperty({
        required: false,
        type: CreateBetCelebritiesOnBetRelationInputDto
    })
    CelebritiesOnBet?: CreateBetCelebritiesOnBetRelationInputDto;
}

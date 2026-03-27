import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { ConnectMembershipDto } from "../../membership/dto/connect-membership.dto";
import { ConnectBetDto } from "../../bet/dto/connect-bet.dto";

export class CreateCircleMembershipsRelationInputDto {
    @ApiProperty({
        type: ConnectMembershipDto,
        isArray: true
    })
    connect: ConnectMembershipDto[];
}
export class CreateCircleBetsRelationInputDto {
    @ApiProperty({
        type: ConnectBetDto,
        isArray: true
    })
    connect: ConnectBetDto[];
}

@ApiExtraModels(
    ConnectMembershipDto,
    CreateCircleMembershipsRelationInputDto,
    ConnectBetDto,
    CreateCircleBetsRelationInputDto
)
export class CreateCircleDto {
    @ApiProperty({
        type: "string"
    })
    name: string;
    @ApiProperty({
        type: "string",
        required: false,
        nullable: true
    })
    code?: string | null;
    @ApiProperty({
        type: "boolean"
    })
    allowNewBet: boolean;
    @ApiProperty({
        required: false,
        type: CreateCircleMembershipsRelationInputDto
    })
    memberships?: CreateCircleMembershipsRelationInputDto;
    @ApiProperty({
        required: false,
        type: CreateCircleBetsRelationInputDto
    })
    bets?: CreateCircleBetsRelationInputDto;
}

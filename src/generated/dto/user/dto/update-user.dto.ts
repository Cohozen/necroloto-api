import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { ConnectBetDto } from "../../bet/dto/connect-bet.dto";
import { ConnectMembershipDto } from "../../membership/dto/connect-membership.dto";

export class UpdateUserBetsRelationInputDto {
    @ApiProperty({
        type: ConnectBetDto
    })
    disconnect: ConnectBetDto[];
}
export class UpdateUserMembershipRelationInputDto {
    @ApiProperty({
        type: ConnectMembershipDto
    })
    disconnect: ConnectMembershipDto[];
}

@ApiExtraModels(
    ConnectBetDto,
    UpdateUserBetsRelationInputDto,
    ConnectMembershipDto,
    UpdateUserMembershipRelationInputDto
)
export class UpdateUserDto {
    @ApiProperty({
        type: "string",
        required: false
    })
    clerkId?: string;
    @ApiProperty({
        type: "string",
        required: false,
        nullable: true
    })
    email?: string | null;
    @ApiProperty({
        type: "string",
        required: false,
        nullable: true
    })
    image?: string | null;
    @ApiProperty({
        type: "string",
        required: false,
        nullable: true
    })
    username?: string | null;
    @ApiProperty({
        type: "string",
        required: false,
        nullable: true
    })
    firstname?: string | null;
    @ApiProperty({
        type: "string",
        required: false,
        nullable: true
    })
    lastname?: string | null;
    @ApiProperty({
        required: false,
        type: UpdateUserBetsRelationInputDto
    })
    Bets?: UpdateUserBetsRelationInputDto;
    @ApiProperty({
        required: false,
        type: UpdateUserMembershipRelationInputDto
    })
    Membership?: UpdateUserMembershipRelationInputDto;
}

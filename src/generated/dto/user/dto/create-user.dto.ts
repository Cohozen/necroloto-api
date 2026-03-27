import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { ConnectBetDto } from "../../bet/dto/connect-bet.dto";
import { ConnectMembershipDto } from "../../membership/dto/connect-membership.dto";

export class CreateUserBetsRelationInputDto {
    @ApiProperty({
        type: ConnectBetDto,
        isArray: true
    })
    connect: ConnectBetDto[];
}
export class CreateUserMembershipRelationInputDto {
    @ApiProperty({
        type: ConnectMembershipDto,
        isArray: true
    })
    connect: ConnectMembershipDto[];
}

@ApiExtraModels(
    ConnectBetDto,
    CreateUserBetsRelationInputDto,
    ConnectMembershipDto,
    CreateUserMembershipRelationInputDto
)
export class CreateUserDto {
    @ApiProperty({
        type: "string"
    })
    clerkId: string;
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
        type: CreateUserBetsRelationInputDto
    })
    Bets?: CreateUserBetsRelationInputDto;
    @ApiProperty({
        required: false,
        type: CreateUserMembershipRelationInputDto
    })
    Membership?: CreateUserMembershipRelationInputDto;
}

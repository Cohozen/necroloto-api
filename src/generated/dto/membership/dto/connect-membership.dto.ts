import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

export class MembershipUserIdCircleIdUniqueInputDto {
    @ApiProperty({
        type: "string"
    })
    userId: string;
    @ApiProperty({
        type: "string"
    })
    circleId: string;
}

@ApiExtraModels(MembershipUserIdCircleIdUniqueInputDto)
export class ConnectMembershipDto {
    @ApiProperty({
        type: "string",
        required: false
    })
    id?: string;
    @ApiProperty({
        type: MembershipUserIdCircleIdUniqueInputDto,
        required: false
    })
    userId_circleId?: MembershipUserIdCircleIdUniqueInputDto;
}

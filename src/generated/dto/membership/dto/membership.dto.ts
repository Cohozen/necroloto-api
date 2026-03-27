import { MembershipRole } from "../../../../../generated/prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class MembershipDto {
    @ApiProperty({
        type: "string"
    })
    id: string;
    @ApiProperty({
        enum: MembershipRole,
        enumName: "MembershipRole"
    })
    role: MembershipRole;
    @ApiProperty({
        type: "string",
        format: "date-time"
    })
    joinedAt: Date;
}

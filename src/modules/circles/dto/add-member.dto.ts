import { MembershipRole } from "@/prisma/enums";
import { ApiProperty } from "@nestjs/swagger";

export class AddMemberDto {
    @ApiProperty()
    userId: string;

    @ApiProperty({ enum: ["ADMIN", "MEMBER"] })
    role?: MembershipRole;
}

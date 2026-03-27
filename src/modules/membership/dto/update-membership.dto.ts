import { MembershipRole } from "@/prisma/enums";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMembershipDto {
    @ApiProperty({ enum: ["ADMIN", "MEMBER"] })
    role?: MembershipRole;
}

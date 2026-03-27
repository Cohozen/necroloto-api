import { MembershipRole } from "@/prisma/enums";
import { ApiProperty } from "@nestjs/swagger";

export class SearchMembershipDto {
    @ApiProperty()
    userId?: string;

    @ApiProperty()
    circleId?: string;

    @ApiProperty({ enum: ["ADMIN", "MEMBER"] })
    role?: MembershipRole;
}

import { CircleVisibility, CircleStatus } from "@/prisma/enums";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCircleDto {
    @ApiProperty()
    name?: string;

    @ApiProperty({ enum: ["PRIVATE", "PUBLIC"] })
    visibility?: CircleVisibility;

    @ApiProperty({ enum: ["OPEN", "LOCKED", "ARCHIVED"] })
    status?: CircleStatus;

    @ApiProperty()
    code?: string;

    @ApiProperty()
    allowNewBet?: boolean;
}

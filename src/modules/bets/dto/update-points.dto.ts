import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdatePointsDto {
    @ApiProperty()
    points: number;

    @ApiPropertyOptional({ default: "celebrity_death" })
    reason?: string;
}

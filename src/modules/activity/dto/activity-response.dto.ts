import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ActivityUserDto {
    @ApiProperty() id: string;
    @ApiPropertyOptional({ nullable: true }) username: string | null;
    @ApiPropertyOptional({ nullable: true }) firstname: string | null;
    @ApiPropertyOptional({ nullable: true }) lastname: string | null;
    @ApiPropertyOptional({ nullable: true }) image: string | null;
}

export class ActivityResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() circleId: string;
    @ApiProperty() userId: string;
    @ApiProperty() type: string;
    @ApiPropertyOptional({ nullable: true }) metadata: Record<string, unknown> | null;
    @ApiProperty() createdAt: Date;
    @ApiProperty({ type: ActivityUserDto }) user: ActivityUserDto;
}

export class ActivityPageDto {
    @ApiProperty({ type: [ActivityResponseDto] }) items: ActivityResponseDto[];
    @ApiPropertyOptional({ nullable: true }) nextCursor: string | null;
    @ApiProperty() total: number;
}

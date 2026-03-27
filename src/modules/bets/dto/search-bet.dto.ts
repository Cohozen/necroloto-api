import { ApiProperty } from "@nestjs/swagger";

export class SearchBetDto {
    @ApiProperty()
    userId?: string;

    @ApiProperty()
    circleId?: string;

    @ApiProperty()
    year?: number;
}

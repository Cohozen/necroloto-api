import { ApiProperty } from "@nestjs/swagger";

export class UpdateBetDto {
    @ApiProperty()
    year?: number;

    @ApiProperty()
    circleId?: string;
}

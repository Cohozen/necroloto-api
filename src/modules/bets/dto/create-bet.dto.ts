import { ApiProperty } from "@nestjs/swagger";

export class CreateBetDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    circleId?: string;

    @ApiProperty()
    year: number;

    @ApiProperty({ type: [String] })
    celebrityIds?: string[];
}

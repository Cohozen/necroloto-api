import { ApiProperty } from "@nestjs/swagger";

export class UpdateCelebrityDto {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    birth?: Date;

    @ApiProperty()
    death?: Date;

    @ApiProperty()
    photo?: string;
}

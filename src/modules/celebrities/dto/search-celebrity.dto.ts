import { ApiProperty } from "@nestjs/swagger";

export class SearchCelebrityDto {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    isAlive?: boolean;

    @ApiProperty()
    birthYear?: number;
}

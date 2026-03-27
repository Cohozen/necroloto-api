import { ApiProperty } from "@nestjs/swagger";

export class CelebrityDto {
    @ApiProperty({
        type: "string"
    })
    id: string;
    @ApiProperty({
        type: "string"
    })
    name: string;
    @ApiProperty({
        type: "string",
        format: "date-time",
        nullable: true
    })
    birth: Date | null;
    @ApiProperty({
        type: "string",
        format: "date-time",
        nullable: true
    })
    death: Date | null;
    @ApiProperty({
        type: "string",
        nullable: true
    })
    photo: string | null;
}

import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { Circle } from "../../circle/entities/circle.entity";
import { CelebritiesOnBet } from "../../celebrities-on-bet/entities/celebrities-on-bet.entity";

export class Bet {
    @ApiProperty({
        type: "string"
    })
    id: string;
    @ApiProperty({
        type: "string"
    })
    userId: string;
    @ApiProperty({
        type: "string",
        nullable: true
    })
    circleId: string | null;
    @ApiProperty({
        type: "integer",
        format: "int32"
    })
    year: number;
    @ApiProperty({
        type: "string",
        format: "date-time"
    })
    createdAt: Date;
    @ApiProperty({
        type: "string",
        format: "date-time"
    })
    updatedAt: Date;
    @ApiProperty({
        type: () => User
    })
    user: User;
    @ApiProperty({
        type: () => Circle,
        required: false,
        nullable: true
    })
    Circle?: Circle | null;
    @ApiProperty({
        type: () => CelebritiesOnBet,
        isArray: true,
        required: false
    })
    CelebritiesOnBet?: CelebritiesOnBet[];
}

import { ApiProperty } from '@nestjs/swagger';
import { CelebritiesOnBet } from '../../celebrities-on-bet/entities/celebrities-on-bet.entity';

export class Celebrity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  birth: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  death: Date | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  photo: string | null;
  @ApiProperty({
    type: () => CelebritiesOnBet,
    isArray: true,
    required: false,
  })
  CelebritiesOnBet?: CelebritiesOnBet[];
}

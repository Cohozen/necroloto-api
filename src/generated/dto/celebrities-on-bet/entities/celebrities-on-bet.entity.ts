import { ApiProperty } from '@nestjs/swagger';
import { Bet } from '../../bet/entities/bet.entity';
import { Celebrity } from '../../celebrity/entities/celebrity.entity';

export class CelebritiesOnBet {
  @ApiProperty({
    type: 'string',
  })
  betId: string;
  @ApiProperty({
    type: 'string',
  })
  celebrityId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'number',
    format: 'float',
  })
  points: number;
  @ApiProperty({
    type: () => Bet,
  })
  bet: Bet;
  @ApiProperty({
    type: () => Celebrity,
  })
  celebrity: Celebrity;
}

import { ApiProperty } from '@nestjs/swagger';

export class CelebritiesOnBetDto {
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
}

import {
  CircleStatus,
  CircleVisibility,
} from '../../../../../generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CircleDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    enum: CircleVisibility,
    enumName: 'CircleVisibility',
  })
  visibility: CircleVisibility;
  @ApiProperty({
    enum: CircleStatus,
    enumName: 'CircleStatus',
  })
  status: CircleStatus;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  code: string | null;
  @ApiProperty({
    type: 'boolean',
  })
  allowNewBet: boolean;
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
}

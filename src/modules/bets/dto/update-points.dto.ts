import { ApiProperty } from '@nestjs/swagger';

export class UpdatePointsDto {
  @ApiProperty()
  points: number;
}

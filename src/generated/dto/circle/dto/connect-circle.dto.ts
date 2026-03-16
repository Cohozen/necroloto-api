import { ApiProperty } from '@nestjs/swagger';

export class ConnectCircleDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}

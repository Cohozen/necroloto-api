import { ApiProperty } from '@nestjs/swagger';

export class ConnectCelebrityDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
}

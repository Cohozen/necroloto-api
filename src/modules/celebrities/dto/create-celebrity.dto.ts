import { ApiProperty } from '@nestjs/swagger';

export class CreateCelebrityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  birth?: Date;

  @ApiProperty()
  death?: Date;

  @ApiProperty()
  photo?: string;
}

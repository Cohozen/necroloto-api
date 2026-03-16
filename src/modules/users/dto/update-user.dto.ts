import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  email?: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  firstname?: string;

  @ApiProperty()
  lastname?: string;

  @ApiProperty()
  clerkUpdatedAt?: Date;
}

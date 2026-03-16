import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  clerkId: string;

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
  clerkCreatedAt?: Date;

  @ApiProperty()
  clerkUpdatedAt?: Date;
}

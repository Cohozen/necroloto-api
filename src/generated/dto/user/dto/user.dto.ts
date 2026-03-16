import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  clerkId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  email: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  image: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  username: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  firstname: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  lastname: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  clerkCreatedAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  clerkUpdatedAt: Date;
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

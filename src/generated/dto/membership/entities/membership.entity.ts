import { MembershipRole } from '../../../../../generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Circle } from '../../circle/entities/circle.entity';

export class Membership {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: () => User,
  })
  user: User;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: () => Circle,
  })
  circle: Circle;
  @ApiProperty({
    type: 'string',
  })
  circleId: string;
  @ApiProperty({
    enum: MembershipRole,
    enumName: 'MembershipRole',
  })
  role: MembershipRole;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  joinedAt: Date;
}

import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { ConnectUserDto } from '../../user/dto/connect-user.dto';
import { ConnectCircleDto } from '../../circle/dto/connect-circle.dto';

export class CreateMembershipUserRelationInputDto {
  @ApiProperty({
    type: ConnectUserDto,
  })
  connect: ConnectUserDto;
}
export class CreateMembershipCircleRelationInputDto {
  @ApiProperty({
    type: ConnectCircleDto,
  })
  connect: ConnectCircleDto;
}

@ApiExtraModels(
  ConnectUserDto,
  CreateMembershipUserRelationInputDto,
  ConnectCircleDto,
  CreateMembershipCircleRelationInputDto,
)
export class CreateMembershipDto {
  @ApiProperty({
    type: CreateMembershipUserRelationInputDto,
  })
  user: CreateMembershipUserRelationInputDto;
  @ApiProperty({
    type: CreateMembershipCircleRelationInputDto,
  })
  circle: CreateMembershipCircleRelationInputDto;
}

import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { ConnectMembershipDto } from '../../membership/dto/connect-membership.dto';
import { ConnectBetDto } from '../../bet/dto/connect-bet.dto';

export class UpdateCircleMembershipsRelationInputDto {
  @ApiProperty({
    type: ConnectMembershipDto,
  })
  disconnect: ConnectMembershipDto[];
}
export class UpdateCircleBetsRelationInputDto {
  @ApiProperty({
    type: ConnectBetDto,
  })
  disconnect: ConnectBetDto[];
}

@ApiExtraModels(
  ConnectMembershipDto,
  UpdateCircleMembershipsRelationInputDto,
  ConnectBetDto,
  UpdateCircleBetsRelationInputDto,
)
export class UpdateCircleDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  name?: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  code?: string | null;
  @ApiProperty({
    type: 'boolean',
    required: false,
  })
  allowNewBet?: boolean;
  @ApiProperty({
    required: false,
    type: UpdateCircleMembershipsRelationInputDto,
  })
  memberships?: UpdateCircleMembershipsRelationInputDto;
  @ApiProperty({
    required: false,
    type: UpdateCircleBetsRelationInputDto,
  })
  bets?: UpdateCircleBetsRelationInputDto;
}

import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { ConnectCelebritiesOnBetDto } from '../../celebrities-on-bet/dto/connect-celebrities-on-bet.dto';

export class UpdateBetCircleRelationInputDto {
  @ApiProperty({
    type: 'boolean',
  })
  disconnect: boolean;
}
export class UpdateBetCelebritiesOnBetRelationInputDto {
  @ApiProperty({
    type: ConnectCelebritiesOnBetDto,
  })
  disconnect: ConnectCelebritiesOnBetDto[];
}

@ApiExtraModels(
  UpdateBetCircleRelationInputDto,
  ConnectCelebritiesOnBetDto,
  UpdateBetCelebritiesOnBetRelationInputDto,
)
export class UpdateBetDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  year?: number;
  @ApiProperty({
    required: false,
    type: UpdateBetCircleRelationInputDto,
  })
  Circle?: UpdateBetCircleRelationInputDto;
  @ApiProperty({
    required: false,
    type: UpdateBetCelebritiesOnBetRelationInputDto,
  })
  CelebritiesOnBet?: UpdateBetCelebritiesOnBetRelationInputDto;
}

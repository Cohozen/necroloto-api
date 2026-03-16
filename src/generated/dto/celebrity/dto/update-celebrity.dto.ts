import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { ConnectCelebritiesOnBetDto } from '../../celebrities-on-bet/dto/connect-celebrities-on-bet.dto';

export class UpdateCelebrityCelebritiesOnBetRelationInputDto {
  @ApiProperty({
    type: ConnectCelebritiesOnBetDto,
  })
  disconnect: ConnectCelebritiesOnBetDto[];
}

@ApiExtraModels(
  ConnectCelebritiesOnBetDto,
  UpdateCelebrityCelebritiesOnBetRelationInputDto,
)
export class UpdateCelebrityDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  name?: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  birth?: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  death?: Date | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  photo?: string | null;
  @ApiProperty({
    required: false,
    type: UpdateCelebrityCelebritiesOnBetRelationInputDto,
  })
  CelebritiesOnBet?: UpdateCelebrityCelebritiesOnBetRelationInputDto;
}

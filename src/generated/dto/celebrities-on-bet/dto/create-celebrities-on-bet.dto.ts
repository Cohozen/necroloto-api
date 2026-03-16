import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { ConnectBetDto } from '../../bet/dto/connect-bet.dto';
import { ConnectCelebrityDto } from '../../celebrity/dto/connect-celebrity.dto';

export class CreateCelebritiesOnBetBetRelationInputDto {
  @ApiProperty({
    type: ConnectBetDto,
  })
  connect: ConnectBetDto;
}
export class CreateCelebritiesOnBetCelebrityRelationInputDto {
  @ApiProperty({
    type: ConnectCelebrityDto,
  })
  connect: ConnectCelebrityDto;
}

@ApiExtraModels(
  ConnectBetDto,
  CreateCelebritiesOnBetBetRelationInputDto,
  ConnectCelebrityDto,
  CreateCelebritiesOnBetCelebrityRelationInputDto,
)
export class CreateCelebritiesOnBetDto {
  @ApiProperty({
    type: CreateCelebritiesOnBetBetRelationInputDto,
  })
  bet: CreateCelebritiesOnBetBetRelationInputDto;
  @ApiProperty({
    type: CreateCelebritiesOnBetCelebrityRelationInputDto,
  })
  celebrity: CreateCelebritiesOnBetCelebrityRelationInputDto;
}

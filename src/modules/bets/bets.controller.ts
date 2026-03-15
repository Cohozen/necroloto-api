import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { AddCelebrityToBetDto } from './dto/add-celebrity-to-bet.dto';
import { ClerkAuthGuard } from '../auth/guards/clerk.auth.guard';

@UseGuards(ClerkAuthGuard)
@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  create(@Body() createBetDto: CreateBetDto) {
    return this.betsService.create(createBetDto);
  }

  @Get()
  findAll() {
    return this.betsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betsService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.betsService.findByUser(userId);
  }

  @Get('circle/:circleId')
  findByCircle(@Param('circleId') circleId: string) {
    return this.betsService.findByCircle(circleId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBetDto: UpdateBetDto) {
    return this.betsService.update(id, updateBetDto);
  }

  @Post(':id/celebrities')
  addCelebrityToBet(
    @Param('id') id: string,
    @Body() dto: AddCelebrityToBetDto,
  ) {
    return this.betsService.addCelebrityToBet(id, dto);
  }

  @Delete(':id/celebrities/:celebrityId')
  removeCelebrityFromBet(
    @Param('id') id: string,
    @Param('celebrityId') celebrityId: string,
  ) {
    return this.betsService.removeCelebrityFromBet(id, celebrityId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betsService.remove(id);
  }
}

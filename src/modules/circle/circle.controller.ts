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
import { CircleService } from './circle.service';
import { CreateCircleDto } from './dto/create-circle.dto';
import { UpdateCircleDto } from './dto/update-circle.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { ClerkAuthGuard } from '../auth/guards/clerk.auth.guard';

@UseGuards(ClerkAuthGuard)
@Controller('circle')
export class CircleController {
  constructor(private readonly circleService: CircleService) {}

  @Post()
  create(@Body() createCircleDto: CreateCircleDto) {
    return this.circleService.create(createCircleDto);
  }

  @Get()
  findAll() {
    return this.circleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.circleService.findOne(id);
  }

  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.circleService.findByCode(code);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.circleService.findByUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCircleDto: UpdateCircleDto) {
    return this.circleService.update(id, updateCircleDto);
  }

  @Post(':id/members')
  addMember(@Param('id') id: string, @Body() dto: AddMemberDto) {
    return this.circleService.addMember(id, dto);
  }

  @Delete(':id/members/:userId')
  removeMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.circleService.removeMember(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.circleService.remove(id);
  }
}

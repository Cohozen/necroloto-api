import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCelebrityDto } from './dto/create-celebrity.dto';
import { UpdateCelebrityDto } from './dto/update-celebrity.dto';

@Injectable()
export class CelebritiesService {
  constructor(private prisma: PrismaService) {}

  async create(createCelebrityDto: CreateCelebrityDto) {
    return this.prisma.celebrity.create({
      data: createCelebrityDto,
    });
  }

  async findAll() {
    return this.prisma.celebrity.findMany({
      include: {
        CelebritiesOnBet: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.celebrity.findUnique({
      where: { id },
      include: {
        CelebritiesOnBet: true,
      },
    });
  }

  async update(id: string, updateCelebrityDto: UpdateCelebrityDto) {
    return this.prisma.celebrity.update({
      where: { id },
      data: updateCelebrityDto,
    });
  }

  async remove(id: string) {
    return this.prisma.celebrity.delete({
      where: { id },
    });
  }
}

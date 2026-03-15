import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCelebrityDto } from './dto/create-celebrity.dto';
import { UpdateCelebrityDto } from './dto/update-celebrity.dto';
import { SearchCelebrityDto } from './dto/search-celebrity.dto';

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

  async search(searchCelebrityDto: SearchCelebrityDto) {
    const { name, isAlive, birthYear } = searchCelebrityDto;

    return this.prisma.celebrity.findMany({
      where: {
        ...(name && {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        }),
        ...(isAlive !== undefined && {
          death: isAlive ? null : { not: null },
        }),
        ...(birthYear && {
          birth: {
            gte: new Date(`${birthYear}-01-01`),
            lt: new Date(`${birthYear + 1}-01-01`),
          },
        }),
      },
      include: {
        CelebritiesOnBet: true,
      },
    });
  }

  async merge(sourceId: string, targetId: string) {
    // Update all CelebritiesOnBet from source to target
    await this.prisma.celebritiesOnBet.updateMany({
      where: { celebrityId: sourceId },
      data: { celebrityId: targetId },
    });

    // Delete the source celebrity
    return this.prisma.celebrity.delete({
      where: { id: sourceId },
    });
  }
}

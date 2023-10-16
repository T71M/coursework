import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { PrismaService } from '../prisma/prisma.service';
import { validateData } from 'src/utils/validate-data';

@Injectable()
export class PointsService {
  constructor(private prisma: PrismaService) {}
  async create(createPointDto: CreatePointDto) {
    await validateData(createPointDto);
    return await this.prisma.point.create({
      data: createPointDto,
    });
  }

  findAll() {
    return this.prisma.point.findMany({ include: { region: true } });
  }

  async findOne(id: number) {
    return await this.prisma.point.findUnique({ where: { id } });
  }

  async update(id: number, updatePointDto: UpdatePointDto) {
    await validateData(updatePointDto);
    if (!id) throw new NotFoundException('Point with that id not found');
    return await this.prisma.point.update({
      data: updatePointDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.point.delete({ where: { id } });
  }
}

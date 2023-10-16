import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateData } from 'src/utils/validate-data';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    await validateData(createRegionDto);
    return await this.prisma.region.create({ data: createRegionDto });
  }

  async findAll() {
    return await this.prisma.region.findMany();
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('Region with that id not found');
    }
    return await this.prisma.region.findUnique({ where: { id } });
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    await validateData(updateRegionDto);
    return await this.prisma.region.update({
      data: updateRegionDto,
      where: { id },
    });
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException('');
    }

    const res = await this.prisma.region.delete({ where: { id } });
    return res;
  }

  async getAllCities(regionId: number) {
    const res = await this.prisma.point.findMany({ where: { regionId } });

    return res;
  }
}

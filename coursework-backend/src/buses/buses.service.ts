import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateData } from 'src/utils/validate-data';

@Injectable()
export class BusesService {
  constructor(private prisma: PrismaService) {}

  async create(createBusDto: CreateBusDto) {
    await validateData(createBusDto);
    const data = { ...createBusDto, comforts: undefined };
    const res = await this.prisma.bus.create({
      data: {
        ...data,
        comforts: {
          create: createBusDto.comforts?.map((comfortId) => {
            return {
              comfortId,
            };
          }),
        },
      },
    });

    return { bus: res };
  }

  async findAll() {
    const res = await this.prisma.bus.findMany();

    return res;
  }

  async findOne(id: number) {
    const res = await this.prisma.bus.findUnique({
      where: { id },
      include: {
        comforts: {
          include: {
            comfort: true,
          },
        },
      },
    });

    return { bus: res };
  }

  async update(id: number, updateBusDto: UpdateBusDto) {
    await validateData(updateBusDto);
    const data = { ...updateBusDto, comforts: undefined };
    const res = await this.prisma.bus.update({
      where: { id },
      data: data,
    });

    return res;
  }

  async remove(id: number) {
    const res = await this.prisma.bus.delete({ where: { id } });
    return res;
  }

  async connectComfort(busId: number, comfortId: number) {
    if (!busId || !comfortId)
      throw new BadRequestException('busId or comfortId are empty!');
    const res = await this.prisma.bus.update({
      where: { id: busId },
      data: {
        comforts: {
          connectOrCreate: {
            where: { busId_comfortId: { busId, comfortId } },
            create: { comfortId },
          },
        },
      },
    });
    return res;
  }

  async disconnectComfort(busId: number, comfortId: number) {
    if (!busId || !comfortId)
      throw new BadRequestException('busId or comfortId are empty!');
    const res = await this.prisma.bus.update({
      where: { id: busId },
      data: {
        comforts: {
          delete: { busId_comfortId: { busId, comfortId } },
        },
      },
    });
    return res;
  }
}

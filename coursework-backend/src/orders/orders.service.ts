import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';
import { PaginationParams } from 'src/constants';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const res = await this.prisma.order.create({ data: createOrderDto });
    return res;
  }

  async findAll(
    query: PaginationParams & { userId: string; routeId: string; date: string },
  ) {
    let formattedDate;
    if (query.date) {
      formattedDate = dayjs(query.date).toDate();
    }

    const user = query.userId ? +query.userId : undefined;
    const route = query.routeId ? +query.routeId : undefined;

    const totalItems = await this.prisma.order.count({
      where: {
        date: formattedDate,
        userId: user,
        routeId: route,
      },
    });

    const res = await this.prisma.order.findMany({
      skip: (Number(query.page) - 1) * Number(query.perPage),
      take: Number(query.perPage),
      where: {
        date: formattedDate,
        userId: user,
        routeId: route,
      },
      include: {
        route: {
          include: {
            bus: true,
            startPoint: {
              include: {
                region: true,
              },
            },
            endPoint: { include: { region: true } },
          },
        },
      },
    });

    const meta = {
      totalItems,
      totalPages: Math.ceil(totalItems / +query.perPage),
    };

    return { data: res, meta };
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const res = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });

    return res;
  }

  async remove(id: number) {
    const res = await this.prisma.order.delete({ where: { id } });

    return res;
  }
}

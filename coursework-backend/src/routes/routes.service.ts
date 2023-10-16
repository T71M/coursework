import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RouteSearchParamsDto } from './dto/route-search-params.dto';
import * as dayjs from 'dayjs';
import { Weekday } from '@prisma/client';
import { validate } from 'class-validator';
import { validateData } from 'src/utils/validate-data';
import { asyncMap } from 'src/utils/asyncMap';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  async create(createRouteDto: CreateRouteDto) {
    const startPoint = await this.prisma.point.findUnique({
      where: { name: 'Донецк' },
    });
    const data = {
      ...createRouteDto,
      startPointId: startPoint.id,
    } as CreateRouteDto;
    createRouteDto = data;
    const errors = await validate(createRouteDto);
    if (errors.length) {
      throw new BadRequestException(errors);
    }
    const res = await this.prisma.route.create({
      data: createRouteDto,
    });
    return res;
  }

  async findAll(query: RouteSearchParamsDto) {
    const endId = Number(query.endPointId);
    const startId = Number(query.startPointId);
    const totalItems = await this.prisma.route.count({
      where: {
        endPointId: !isNaN(endId) ? endId : undefined,
        startPointId: !isNaN(startId) ? startId : undefined,
        weekDayStart: query.weekDayStart,
        weekDayStop: query.weekDayEnd,
        name: { contains: query.search },
      },
    });
    const skip = isNaN((Number(query.page) - 1) * Number(query.perPage))
      ? undefined
      : (Number(query.page) - 1) * Number(query.perPage);
    const take = isNaN(Number(query.perPage))
      ? undefined
      : Number(query.perPage);
    const res = await this.prisma.route.findMany({
      skip,
      take,
      where: {
        endPointId: !isNaN(endId) ? endId : undefined,
        startPointId: !isNaN(startId) ? startId : undefined,
        weekDayStart: query.weekDayStart,
        weekDayStop: query.weekDayEnd,
        name: { contains: query.search, mode: 'insensitive' },
      },
      include: {
        endPoint: { include: { region: true } },
        startPoint: {
          include: {
            region: true,
          },
        },
        bus: true,
      },
    });

    const date = query.date ? dayjs(query.date).toDate() : undefined;

    if (date) {
      await asyncMap(res, async (v, i) => {
        const orders = await this.prisma.order.findMany({
          where: { routeId: v.id, date: date },
        });
        console.debug(orders);
        let freeSeats = v.bus.seats_count;

        orders.map((v) => {
          freeSeats -= v.seat_count;
        });
        (res[i] as any).freeSeats = freeSeats;
      });
    }

    const meta = {
      totalItems,
      totalPages: Math.ceil(totalItems / +query.perPage),
    };

    return { meta, data: res };
  }

  async findOne(id: number, date?: string) {
    const res = await this.prisma.route.findUniqueOrThrow({
      where: { id },
      include: {
        bus: true,
        startPoint: { include: { region: true } },
        endPoint: { include: { region: true } },
      },
    });

    if (!res) {
      throw new NotFoundException('route not found');
    }
    const localDate = date ? dayjs(date).toDate() : undefined;

    const orders = await this.prisma.order.findMany({
      where: {
        routeId: res.id,
        date: localDate,
      },
    });
    console.debug(orders);

    let freeSeats = res.bus.seats_count;

    orders.map((v) => {
      freeSeats -= v.seat_count;
    });

    (res as any).freeSeats = freeSeats;

    return res;
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) {
    await validateData(updateRouteDto);
    const res = await this.prisma.route.updateMany({
      data: updateRouteDto,
      where: { id },
    });
    return res;
  }

  async remove(id: number) {
    const res = await this.prisma.route.delete({
      where: { id },
    });
    return res;
  }

  async getRandomRoutes(date: string) {
    const count = await this.prisma.route.count();
    const skip = count > 10 ? Math.floor(Math.random() * count) : 0;

    const day = this.getWeekDay(dayjs(date).day());

    const res = await this.prisma.route.findMany({
      take: 10,
      skip,
      orderBy: {
        name: 'asc',
      },
      where: {
        weekDayStart: day,
      },
      include: {
        bus: true,
        endPoint: { include: { region: true } },
        startPoint: {
          include: {
            region: true,
          },
        },
      },
    });

    const data = date ? dayjs(date).toDate() : undefined;

    if (date) {
      await asyncMap(res, async (v, i) => {
        const orders = await this.prisma.order.findMany({
          where: { routeId: v.id, date: data },
        });
        console.debug(orders);
        let freeSeats = v.bus.seats_count;

        orders.map((v) => {
          freeSeats -= v.seat_count;
        });
        (res[i] as any).freeSeats = freeSeats;
      });
    }

    return res;
  }

  async search(endPoint: string, date: string, page: string, perPage: string) {
    const startPoint = await this.prisma.point.findUnique({
      where: { name: 'Донецк' },
    });
    const startWeekDay = this.getWeekDay(dayjs(date).day());
    const res = await this.findAll({
      startPointId: String(startPoint.id),
      weekDayStart: startWeekDay,
      endPointId: endPoint,
      page: page,
      perPage: perPage,
      date: date,
    });

    return res;
  }

  private getWeekDay(day: number): Weekday {
    const weekdays: Weekday[] = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];

    return weekdays[day];
  }
}

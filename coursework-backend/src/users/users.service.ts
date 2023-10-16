import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_ROLES, PaginationParams } from 'src/constants';
import { validateData } from 'src/utils/validate-data';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await validateData(createUserDto);
    const res = await this.prisma.user.create({
      data: createUserDto,
    });
    return res;
  }

  async findAll(query: PaginationParams) {
    const OR = !!query.search
      ? [
          { firstname: { contains: query.search } },
          { lastname: { contains: query.search } },
          { surname: { contains: query.search } },
          { email: { contains: query.search } },
        ]
      : undefined;
    const totalItems = await this.prisma.user.count({
      where: {
        roleId: APP_ROLES.USER,
        OR,
      },
    });
    const res = await this.prisma.user.findMany({
      where: {
        roleId: APP_ROLES.USER,
        OR,
      },
      skip: (Number(query.page) - 1) * Number(query.perPage),
      take: Number(query.perPage),
      select: {
        id: true,
        role: true,
        roleId: true,
        firstname: true,
        lastname: true,
        surname: true,
        email: true,
        password: false,
      },
    });

    const meta = {
      totalItems,
      totalPages: Math.ceil(totalItems / +query.perPage),
    };

    return { meta, data: res };
  }

  findOne(id: number) {
    if (typeof id !== 'number' || isNaN(id)) {
      return null;
    }
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        roleId: true,
        firstname: true,
        lastname: true,
        surname: true,
        email: true,
        password: false,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await validateData(updateUserDto);
    const res = await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });

    return res;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async getAllOperators(query: PaginationParams) {
    const OR = !!query.search
      ? [
          { firstname: { contains: query.search } },
          { lastname: { contains: query.search } },
          { surname: { contains: query.search } },
          { email: { contains: query.search } },
        ]
      : undefined;
    const totalItems = await this.prisma.user.count({
      where: {
        roleId: APP_ROLES.OPERATOR,
        OR,
      },
    });

    const res = await this.prisma.user.findMany({
      where: {
        roleId: APP_ROLES.OPERATOR,
        OR,
      },
      skip: (Number(query.page) - 1) * Number(query.perPage),
      take: Number(query.perPage),
      select: {
        id: true,
        role: true,
        roleId: true,
        firstname: true,
        lastname: true,
        surname: true,
        email: true,
        password: false,
      },
    });

    const meta = {
      totalItems,
      totalPages: Math.ceil(totalItems / +query.perPage),
    };

    return { meta, data: res };
  }
}

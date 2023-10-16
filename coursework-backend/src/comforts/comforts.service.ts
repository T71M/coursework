import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComfortsService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.busComfort.findMany();
  }
}

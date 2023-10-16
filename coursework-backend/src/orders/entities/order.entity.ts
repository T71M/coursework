import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty()
  routeId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  seat_count: number;
}

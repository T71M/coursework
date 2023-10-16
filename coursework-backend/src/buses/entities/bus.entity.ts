import { ApiProperty } from '@nestjs/swagger';
import { Bus, bus_condition } from '@prisma/client';

export class BusEntity implements Bus {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  condition: bus_condition;

  @ApiProperty()
  seats_count: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Route, Weekday } from '@prisma/client';

export class RouteEntity implements Route {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startPointId: number;

  @ApiProperty()
  endPointId: number;

  @ApiProperty()
  weekDayStart: Weekday;

  @ApiProperty()
  weekDayStop: Weekday;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  busId: number;

  @ApiProperty()
  price: number;
}

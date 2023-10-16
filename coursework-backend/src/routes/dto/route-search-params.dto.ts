import { Weekday } from '@prisma/client';
import { PaginationParams } from 'src/constants';

export interface RouteSearchParamsDto extends PaginationParams {
  weekDayEnd?: Weekday;
  weekDayStart?: Weekday;
  startPointId?: string;
  endPointId?: string;
  date?: string;
}

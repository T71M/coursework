import { Route, Weekday } from '@prisma/client';
export declare class RouteEntity implements Route {
    id: number;
    name: string;
    startPointId: number;
    endPointId: number;
    weekDayStart: Weekday;
    weekDayStop: Weekday;
    endTime: string;
    startTime: string;
    busId: number;
    price: number;
}

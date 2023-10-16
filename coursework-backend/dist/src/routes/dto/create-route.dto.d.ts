import { Weekday } from '@prisma/client';
export declare class CreateRouteDto {
    readonly name: string;
    readonly busId: number;
    startPointId: number;
    endPointId: number;
    weekDayStart: Weekday;
    weekDayStop: Weekday;
    endTime: string;
    startTime: string;
    price: number;
}

import { bus_condition } from '@prisma/client';
export declare class CreateBusDto {
    name: string;
    condition: bus_condition;
    seats_count: number;
    comforts: number[];
}

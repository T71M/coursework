import { Bus, bus_condition } from '@prisma/client';
export declare class BusEntity implements Bus {
    id: number;
    name: string;
    condition: bus_condition;
    seats_count: number;
}

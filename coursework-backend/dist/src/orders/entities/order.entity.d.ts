import { Order } from '@prisma/client';
export declare class OrderEntity implements Order {
    id: number;
    routeId: number;
    userId: number;
    date: Date;
    seat_count: number;
}

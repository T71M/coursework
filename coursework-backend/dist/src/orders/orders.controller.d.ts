import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import(".prisma/client").Order>;
    findAll(userId: string, routeId: string, date: string, page: string, perPage: string): Promise<{
        data: (import(".prisma/client").Order & {
            route: import(".prisma/client").Route & {
                startPoint: import(".prisma/client").Point & {
                    region: import(".prisma/client").Region;
                };
                endPoint: import(".prisma/client").Point & {
                    region: import(".prisma/client").Region;
                };
                bus: import(".prisma/client").Bus;
            };
        })[];
        meta: {
            totalItems: number;
            totalPages: number;
        };
    }>;
    remove(id: string): Promise<import(".prisma/client").Order>;
}

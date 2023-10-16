import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationParams } from 'src/constants';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<import(".prisma/client").Order>;
    findAll(query: PaginationParams & {
        userId: string;
        routeId: string;
        date: string;
    }): Promise<{
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
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<import(".prisma/client").Order>;
    remove(id: number): Promise<import(".prisma/client").Order>;
}

import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RouteSearchParamsDto } from './dto/route-search-params.dto';
export declare class RoutesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRouteDto: CreateRouteDto): Promise<import(".prisma/client").Route>;
    findAll(query: RouteSearchParamsDto): Promise<{
        meta: {
            totalItems: number;
            totalPages: number;
        };
        data: (import(".prisma/client").Route & {
            startPoint: import(".prisma/client").Point & {
                region: import(".prisma/client").Region;
            };
            endPoint: import(".prisma/client").Point & {
                region: import(".prisma/client").Region;
            };
            bus: import(".prisma/client").Bus;
        })[];
    }>;
    findOne(id: number, date?: string): Promise<import(".prisma/client").Route & {
        startPoint: import(".prisma/client").Point & {
            region: import(".prisma/client").Region;
        };
        endPoint: import(".prisma/client").Point & {
            region: import(".prisma/client").Region;
        };
        bus: import(".prisma/client").Bus;
    }>;
    update(id: number, updateRouteDto: UpdateRouteDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: number): Promise<import(".prisma/client").Route>;
    getRandomRoutes(date: string): Promise<(import(".prisma/client").Route & {
        startPoint: import(".prisma/client").Point & {
            region: import(".prisma/client").Region;
        };
        endPoint: import(".prisma/client").Point & {
            region: import(".prisma/client").Region;
        };
        bus: import(".prisma/client").Bus;
    })[]>;
    search(endPoint: string, date: string, page: string, perPage: string): Promise<{
        meta: {
            totalItems: number;
            totalPages: number;
        };
        data: (import(".prisma/client").Route & {
            startPoint: import(".prisma/client").Point & {
                region: import(".prisma/client").Region;
            };
            endPoint: import(".prisma/client").Point & {
                region: import(".prisma/client").Region;
            };
            bus: import(".prisma/client").Bus;
        })[];
    }>;
    private getWeekDay;
}

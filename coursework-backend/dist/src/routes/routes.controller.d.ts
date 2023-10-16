import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteSearchParamsDto } from './dto/route-search-params.dto';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
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
    getRandom(date: string): Promise<(import(".prisma/client").Route & {
        startPoint: import(".prisma/client").Point & {
            region: import(".prisma/client").Region;
        };
        endPoint: import(".prisma/client").Point & {
            region: import(".prisma/client").Region;
        };
        bus: import(".prisma/client").Bus;
    })[]>;
    searchRoutes(endPoint: string, date: string, page: string, perPage: string): Promise<{
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
    findOne(id: string, date?: string): Promise<import(".prisma/client").Route & {
        startPoint: import(".prisma/client").Point & {
            region: import(".prisma/client").Region;
        };
        endPoint: import(".prisma/client").Point & {
            region: import(".prisma/client").Region;
        };
        bus: import(".prisma/client").Bus;
    }>;
    update(id: string, updateRouteDto: UpdateRouteDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string): Promise<import(".prisma/client").Route>;
}

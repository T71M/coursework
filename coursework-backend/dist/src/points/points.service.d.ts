import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PointsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPointDto: CreatePointDto): Promise<import(".prisma/client").Point>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").Point & {
        region: import(".prisma/client").Region;
    })[]>;
    findOne(id: number): Promise<import(".prisma/client").Point>;
    update(id: number, updatePointDto: UpdatePointDto): Promise<import(".prisma/client").Point>;
    remove(id: number): Promise<import(".prisma/client").Point>;
}

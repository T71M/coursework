import { PointsService } from './points.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
export declare class PointsController {
    private readonly pointsService;
    constructor(pointsService: PointsService);
    create(createPointDto: CreatePointDto): Promise<import(".prisma/client").Point>;
    findAll(): Promise<(import(".prisma/client").Point & {
        region: import(".prisma/client").Region;
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").Point>;
    update(id: string, updatePointDto: UpdatePointDto): Promise<import(".prisma/client").Point>;
    remove(id: string): Promise<import(".prisma/client").Point>;
}

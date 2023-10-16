import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
export declare class RegionsController {
    private readonly regionsService;
    constructor(regionsService: RegionsService);
    create(createRegionDto: CreateRegionDto): Promise<import(".prisma/client").Region>;
    findAll(): Promise<import(".prisma/client").Region[]>;
    findOne(id: string): Promise<import(".prisma/client").Region>;
    update(id: string, updateRegionDto: UpdateRegionDto): Promise<import(".prisma/client").Region>;
    remove(id: string): Promise<import(".prisma/client").Region>;
    getCities(id: string): Promise<import(".prisma/client").Point[]>;
}

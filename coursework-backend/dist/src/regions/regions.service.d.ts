import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class RegionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRegionDto: CreateRegionDto): Promise<import(".prisma/client").Region>;
    findAll(): Promise<import(".prisma/client").Region[]>;
    findOne(id: number): Promise<import(".prisma/client").Region>;
    update(id: number, updateRegionDto: UpdateRegionDto): Promise<import(".prisma/client").Region>;
    remove(id: number): Promise<import(".prisma/client").Region>;
    getAllCities(regionId: number): Promise<import(".prisma/client").Point[]>;
}

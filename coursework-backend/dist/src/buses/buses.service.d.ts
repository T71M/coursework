import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BusesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBusDto: CreateBusDto): Promise<{
        bus: import(".prisma/client").Bus;
    }>;
    findAll(): Promise<import(".prisma/client").Bus[]>;
    findOne(id: number): Promise<{
        bus: import(".prisma/client").Bus & {
            comforts: (import(".prisma/client").BusConnectedComforts & {
                comfort: import(".prisma/client").BusComfort;
            })[];
        };
    }>;
    update(id: number, updateBusDto: UpdateBusDto): Promise<import(".prisma/client").Bus>;
    remove(id: number): Promise<import(".prisma/client").Bus>;
    connectComfort(busId: number, comfortId: number): Promise<import(".prisma/client").Bus>;
    disconnectComfort(busId: number, comfortId: number): Promise<import(".prisma/client").Bus>;
}

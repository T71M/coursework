import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
export declare class BusesController {
    private readonly busesService;
    constructor(busesService: BusesService);
    create(createBusDto: CreateBusDto): Promise<{
        bus: import(".prisma/client").Bus;
    }>;
    findAll(): Promise<import(".prisma/client").Bus[]>;
    connect(busId: string, comfortId: string): Promise<import(".prisma/client").Bus>;
    disconnect(busId: string, comfortId: string): Promise<import(".prisma/client").Bus>;
    findOne(id: string): Promise<{
        bus: import(".prisma/client").Bus & {
            comforts: (import(".prisma/client").BusConnectedComforts & {
                comfort: import(".prisma/client").BusComfort;
            })[];
        };
    }>;
    update(id: string, updateBusDto: UpdateBusDto): Promise<import(".prisma/client").Bus>;
    remove(id: string): Promise<import(".prisma/client").Bus>;
}

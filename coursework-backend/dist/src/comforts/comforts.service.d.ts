import { PrismaService } from 'src/prisma/prisma.service';
export declare class ComfortsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<import(".prisma/client").BusComfort[]>;
}

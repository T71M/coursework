import { ComfortsService } from './comforts.service';
export declare class ComfortsController {
    private readonly comfortsService;
    constructor(comfortsService: ComfortsService);
    findAll(): Promise<import(".prisma/client").BusComfort[]>;
}

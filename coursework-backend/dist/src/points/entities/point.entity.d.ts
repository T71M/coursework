import { Point } from '@prisma/client';
export declare class PointEntity implements Point {
    id: number;
    name: string;
    regionId: number;
}

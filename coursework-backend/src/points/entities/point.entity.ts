import { ApiProperty } from '@nestjs/swagger';
import { Point } from '@prisma/client';

export class PointEntity implements Point {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  regionId: number;
}

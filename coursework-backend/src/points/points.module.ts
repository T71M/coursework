import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PointsController],
  providers: [PointsService],
  imports: [PrismaModule],
})
export class PointsModule {}

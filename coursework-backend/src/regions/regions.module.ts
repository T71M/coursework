import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RegionsController],
  providers: [RegionsService],
  imports: [PrismaModule],
})
export class RegionsModule {}

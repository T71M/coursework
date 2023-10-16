import { Module } from '@nestjs/common';
import { ComfortsService } from './comforts.service';
import { ComfortsController } from './comforts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ComfortsController],
  providers: [ComfortsService],
  imports: [PrismaModule],
})
export class ComfortsModule {}

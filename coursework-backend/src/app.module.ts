import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PointsModule } from './points/points.module';
import { RegionsModule } from './regions/regions.module';
import { BusesModule } from './buses/buses.module';
import { RoutesModule } from './routes/routes.module';
import dayjs from 'dayjs';
import { APP_PIPE } from '@nestjs/core';
import { OrdersModule } from './orders/orders.module';
import { ComfortsModule } from './comforts/comforts.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    PointsModule,
    RegionsModule,
    BusesModule,
    RoutesModule,
    OrdersModule,
    ComfortsModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'Dayjs',
      useValue: dayjs,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

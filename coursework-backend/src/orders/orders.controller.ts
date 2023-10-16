import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { APP_ROLES } from 'src/constants';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN, APP_ROLES.USER)
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN, APP_ROLES.USER)
  async findAll(
    @Query('userId') userId: string,
    @Query('routeId') routeId: string,
    @Query('date') date: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    return await this.ordersService.findAll({
      userId,
      routeId,
      date,
      page,
      perPage,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN, APP_ROLES.USER)
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(+id);
  }
}

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
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RouteEntity } from './entities/route.entity';
import { RouteSearchParamsDto } from './dto/route-search-params.dto';

import RouteFindResponseDto from './dto/route-find-response.dto';
import { RoleGuard } from 'src/auth/role/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { APP_ROLES } from 'src/constants';

@Controller('routes')
@ApiTags('routes')
@ApiBearerAuth()
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  @ApiOkResponse({ type: RouteEntity })
  async create(@Body() createRouteDto: CreateRouteDto) {
    return await this.routesService.create(createRouteDto);
  }

  @Get()
  @ApiOkResponse({ type: RouteFindResponseDto })
  async findAll(@Query() query: RouteSearchParamsDto) {
    return await this.routesService.findAll(query);
  }

  @Get('random-routes')
  @ApiOkResponse({ type: RouteEntity, isArray: true })
  async getRandom(@Query('date') date: string) {
    return await this.routesService.getRandomRoutes(date);
  }

  @Get('search-routes')
  @ApiOkResponse({ type: RouteEntity, isArray: true })
  async searchRoutes(
    @Query('endPoint') endPoint: string,
    @Query('date') date: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    return await this.routesService.search(endPoint, date, page, perPage);
  }

  @Get(':id')
  @ApiOkResponse({ type: RouteEntity })
  findOne(@Param('id') id: string, @Query('date') date?: string) {
    return this.routesService.findOne(+id, date);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  @ApiOkResponse({ type: RouteEntity })
  async update(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ) {
    return await this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  @ApiOkResponse({ type: RouteEntity })
  async remove(@Param('id') id: string) {
    return await this.routesService.remove(+id);
  }
}

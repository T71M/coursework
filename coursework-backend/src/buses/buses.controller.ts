import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BusEntity } from './entities/bus.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { APP_ROLES } from 'src/constants';

@ApiTags('buses')
@Controller('buses')
@ApiBearerAuth()
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createBusDto: CreateBusDto) {
    return await this.busesService.create(createBusDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  @ApiOkResponse({ type: BusEntity, isArray: true })
  async findAll() {
    return await this.busesService.findAll();
  }

  @Patch(':busId/connect-comfort/:comfortId')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  async connect(
    @Param('busId') busId: string,
    @Param('comfortId') comfortId: string,
  ) {
    return await this.busesService.connectComfort(+busId, +comfortId);
  }
  @Patch(':busId/disconnect-comfort/:comfortId')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  async disconnect(
    @Param('busId') busId: string,
    @Param('comfortId') comfortId: string,
  ) {
    return await this.busesService.disconnectComfort(+busId, +comfortId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  async findOne(@Param('id') id: string) {
    return await this.busesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  async update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return await this.busesService.update(+id, updateBusDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  async remove(@Param('id') id: string) {
    return await this.busesService.remove(+id);
  }
}

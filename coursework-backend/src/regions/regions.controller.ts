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
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegionEntity } from './entities/region.entity';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { APP_ROLES } from 'src/constants';

@ApiTags('regions')
@Controller('regions')
@ApiBearerAuth()
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  @ApiOkResponse({ type: RegionEntity })
  async create(@Body() createRegionDto: CreateRegionDto) {
    return await this.regionsService.create(createRegionDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }

  @Get(':id/points')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  async getCities(@Param('id') id: string) {
    return await this.regionsService.getAllCities(Number(id));
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ComfortsService } from './comforts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role/role.guard';
import { APP_ROLES } from 'src/constants';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('comforts')
@ApiTags('bus comforts')
@ApiBearerAuth()
export class ComfortsController {
  constructor(private readonly comfortsService: ComfortsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.OPERATOR, APP_ROLES.SUPERADMIN)
  async findAll() {
    return await this.comfortsService.findAll();
  }
}

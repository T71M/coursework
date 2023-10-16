import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import UserEntity from './entities/user.entity';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { APP_ROLES, PaginationParams } from 'src/constants';
import { query } from 'express';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query: PaginationParams) {
    query.page = query.page ?? '1';
    query.perPage = query.perPage ?? '1000';
    return await this.usersService.findAll(query);
  }

  @Roles(APP_ROLES.SUPERADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get('operators')
  async getOperators(@Query() query: PaginationParams) {
    return await this.usersService.getAllOperators(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}

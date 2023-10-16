import { Controller } from '@nestjs/common';
import { Body, Get, Post, Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { APP_ROLES } from 'src/constants';
import { RoleGuard } from './role/role.guard';
import { Roles } from './roles/roles.decorator';
import UserEntity from 'src/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Request() request) {
    return await this.authService.login(request.user as User);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.authService.create(user);
  }

  @Post('register-operator')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(APP_ROLES.SUPERADMIN)
  async registerOperator(@Body() user: CreateUserDto) {
    return await this.authService.create(user, APP_ROLES.OPERATOR);
  }

  // @Post('register-superadmin')
  // async registerSuperadmin(@Body() user: CreateUserDto) {
  //   return await this.authService.create(user, APP_ROLES.SUPERADMIN);
  // }

  @Get('whoami')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserEntity })
  whoAmI(@Request() request) {
    const user = request.user;
    user.password = undefined;
    return user as User;
  }

  @Post('login-admin')
  @UseGuards(AuthGuard('local'))
  async adminLogin(@Request() req) {
    return await this.authService.adminLogin(req.user as User);
  }
}

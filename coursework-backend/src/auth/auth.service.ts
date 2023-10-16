import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { ConflictException, HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { APP_ROLES } from 'src/constants';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(user) {
    const token = await this.generateToken(user);
    const foundUser = await this.userService.findOneByEmail(user.email);
    foundUser.password = undefined;
    return { user: foundUser, token };
  }

  public async create(user: CreateUserDto, role?: APP_ROLES) {
    const isEmailExists = await this.checkEmail(user.email);
    if (isEmailExists) {
      throw new ConflictException('The user with this email already exists');
    }
    const hashedPassword = await this.hashPassword(user.password);

    const userToCreate = await this.userService.create({
      ...user,
      password: hashedPassword,
      roleId: role ?? APP_ROLES.USER,
    });

    const { password, ...result } = userToCreate;

    const token = await this.generateToken(result);

    return { user: result, token };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatched = await this.comparePassword(pass, user.password);
    if (!passwordMatched) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async checkEmail(email: string) {
    const found = await this.userService.findOneByEmail(email);
    return !!found;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  async adminLogin(user: User) {
    if (
      user.roleId !== APP_ROLES.OPERATOR &&
      user.roleId !== APP_ROLES.SUPERADMIN
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'You dont have permission',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const token = await this.generateToken(user);
    const foundUser = await this.userService.findOneByEmail(user.email);
    foundUser.password = undefined;
    return { user: foundUser, token };
  }
}

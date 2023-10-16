import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { jwtConstants } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    if (!id || isNaN(id)) {
      throw new UnauthorizedException(
        'You should authorize to perform this operation',
      );
    }
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException(
        'You should authorize to perform this operation',
      );
    }
    return payload;
  }
}

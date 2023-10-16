import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { APP_ROLES } from 'src/constants';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  readonly firstname: string;

  @IsString()
  @ApiProperty()
  readonly lastname: string;
  @IsString()
  @ApiProperty()
  readonly email: string;
  @IsString()
  @ApiProperty()
  readonly surname: string;
  @IsEnum(APP_ROLES)
  @IsOptional()
  readonly roleId: APP_ROLES;
  @IsString()
  @ApiProperty()
  readonly password: string;
}

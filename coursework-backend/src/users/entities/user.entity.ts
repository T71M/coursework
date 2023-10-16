import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export default class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  roleId: number;

  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import PaginationResponseDto from 'src/dto/pagination-response.dto';
import UserEntity from '../entities/user.entity';

export default class RouteFindResponseDto {
  @ApiProperty()
  meta: PaginationResponseDto;

  @ApiProperty({ isArray: true, type: UserEntity })
  data: UserEntity[];
}

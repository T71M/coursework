import { ApiProperty } from '@nestjs/swagger';
import PaginationResponseDto from 'src/dto/pagination-response.dto';
import { RouteEntity } from '../entities/route.entity';

export default class RouteFindResponseDto {
  @ApiProperty()
  meta: PaginationResponseDto;

  @ApiProperty({ isArray: true, type: RouteEntity })
  data: RouteEntity[];
}

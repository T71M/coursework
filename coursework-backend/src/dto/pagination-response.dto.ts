import { ApiProperty } from '@nestjs/swagger';

export default class PaginationResponseDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPage: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  readonly routeId: number;

  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsString()
  readonly date: string;

  @ApiProperty()
  @IsNumber()
  readonly seat_count: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Weekday } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  readonly busId: number;

  @ApiProperty()
  @IsOptional()
  startPointId: number;

  @ApiProperty()
  @IsNumber()
  endPointId: number;

  @ApiProperty()
  @IsEnum(Weekday)
  weekDayStart: Weekday;

  @ApiProperty()
  @IsEnum(Weekday)
  weekDayStop: Weekday;

  @ApiProperty()
  @IsString()
  endTime: string;

  @ApiProperty()
  @IsString()
  startTime: string;

  @IsNumber()
  @ApiProperty()
  price: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { bus_condition } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBusDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(bus_condition)
  condition: bus_condition;

  @ApiProperty()
  @IsNumber()
  seats_count: number;

  @ApiProperty({ required: false, nullable: true, type: [Number] })
  @IsNumber({}, { each: true })
  @IsOptional()
  comforts: number[];
}

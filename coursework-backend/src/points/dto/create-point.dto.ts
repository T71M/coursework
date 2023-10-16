import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePointDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly regionId: number;
}

import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AppDataDto } from './app.dto';

export class CreateBundleDto {
  @ApiProperty({
    example: 'Bundle Association',
    description: 'The title of the bundle',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Description of the bundle',
    description: 'A brief description of the bundle',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: [AppDataDto],
    description: 'List of applications included in the bundle',
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AppDataDto)
  apps: AppDataDto[];
}

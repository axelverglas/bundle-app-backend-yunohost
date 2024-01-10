import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppDto {
  @ApiProperty({
    example: 'nextcloud',
  })
  @IsString()
  app_name: string;

  @ApiProperty({
    example: 'Next Cloud',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'logo',
  })
  @IsOptional()
  @IsString()
  logo: string;

  @ApiProperty({
    example: 'description',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'screenshot',
  })
  @IsOptional()
  @IsString()
  screenshot: string;

  @ApiProperty({
    example: '1',
  })
  @IsOptional()
  @IsString()
  bundle_id: number;
}

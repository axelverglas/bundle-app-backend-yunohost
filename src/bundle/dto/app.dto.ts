import { IsString, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AppDataDto {
  @ApiProperty({
    example: 'yeswiki',
    description: 'The system name of the app',
  })
  @IsString()
  app_name: string;

  @ApiProperty({
    example: 'YesWiki',
    description: 'The display name of the app',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsOptional()
  logo: string;

  @ApiProperty({
    example: 'Wiki facile et rapide à prendre en main',
    description: 'Description of the app',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example:
      'https://github.com/YunoHost-Apps/paheko_ynh/blob/master/doc/screenshots/screenshot.png',
    description: 'URL to a screenshot of the app',
  })
  @IsOptional()
  @IsUrl()
  screenshot: string;
}

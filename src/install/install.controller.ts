import { Controller } from '@nestjs/common';
import { Post, Body, Res, HttpStatus } from '@nestjs/common';
import { InstallService } from './install.service';

@Controller('install')
export class InstallController {
  constructor(private install: InstallService) {}

  @Post('')
  async installApps(@Body() appsData: any[], @Res() response) {
    try {
      const results = await this.install.installApps(appsData);
      response.status(HttpStatus.OK).json({ results });
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
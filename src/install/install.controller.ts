import { Controller, Get } from '@nestjs/common';
import { Post, Body, Res, HttpStatus } from '@nestjs/common';
import { InstallService } from './install.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Install')
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

  @Get('admin-users')
  async getAdminUsers() {
    return await this.install.getAdminUser();
  }
}

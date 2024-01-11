import { Controller } from '@nestjs/common';
import { Post, Body, Res, HttpStatus, Sse } from '@nestjs/common';
import { InstallService } from './install.service';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

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

  @Sse('updates')
  updates() {
    return new Observable((subscriber) => {
      this.install.getEmitter().on('installUpdate', (data) => {
        subscriber.next({ data });
      });
    });
  }
}

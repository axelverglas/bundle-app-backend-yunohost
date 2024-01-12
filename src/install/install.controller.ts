import { Controller } from '@nestjs/common';
import { Post, Body, Res, HttpStatus, Sse } from '@nestjs/common';
import { InstallService } from './install.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('Install')
@Controller('install')
export class InstallController {
  constructor(private install: InstallService) {}

  @ApiOperation({ description: 'Install apps' })
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

  @ApiOperation({ description: 'Get sse message for install app' })
  @Sse('updates')
  updates() {
    return new Observable((subscriber) => {
      const listener = (data) => {
        console.log("Envoi d'une mise à jour SSE:", data);
        subscriber.next({ data });
      };

      this.install.getEmitter().on('installUpdate', listener);

      // Nettoyage lors de la désinscription
      return () => {
        this.install.getEmitter().off('installUpdate', listener);
      };
    });
  }
}

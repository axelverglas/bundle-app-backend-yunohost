import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstallService } from './install/install.service';
import { InstallController } from './install/install.controller';
import { AppsService } from './apps/apps.service';
import { AppsController } from './apps/apps.controller';

@Module({
  imports: [],
  controllers: [AppController, InstallController, AppsController],
  providers: [AppService, InstallService, AppsService],
})
export class AppModule {}

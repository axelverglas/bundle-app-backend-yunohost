import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BundleService } from './bundle/bundle.service';
import { BundleController } from './bundle/bundle.controller';
import { InstallController } from './install/install.controller';
import { InstallService } from './install/install.service';

@Module({
  imports: [],
  controllers: [AppController, BundleController, InstallController],
  providers: [AppService, BundleService, InstallService],
})
export class AppModule {}

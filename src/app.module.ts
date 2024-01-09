import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstallService } from './install/install.service';
import { InstallController } from './install/install.controller';

@Module({
  imports: [],
  controllers: [AppController, InstallController],
  providers: [AppService, InstallService],
})
export class AppModule {}

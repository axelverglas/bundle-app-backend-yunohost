import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BundleService } from './bundle/bundle.service';
import { BundleController } from './bundle/bundle.controller';
import { InstallController } from './install/install.controller';
import { InstallService } from './install/install.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DomainService } from './domain/domain.service';
import { DomainController } from './domain/domain.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    BundleController,
    InstallController,
    UserController,
    DomainController,
  ],
  providers: [
    AppService,
    BundleService,
    InstallService,
    UserService,
    DomainService,
  ],
})
export class AppModule {}

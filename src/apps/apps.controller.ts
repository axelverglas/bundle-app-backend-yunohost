import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { AppData } from 'src/types/app';

@Controller('apps')
export class AppsController {
  constructor(private readonly appService: AppsService) {}

  @Post()
  async createApp(@Body() appData: CreateAppDto): Promise<void> {
    await this.appService.addApp(appData);
  }

  @Get()
  async getApps(): Promise<AppData[]> {
    return await this.appService.readJsonFile();
  }
}

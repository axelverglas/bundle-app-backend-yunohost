import { Controller } from '@nestjs/common';
import { BundleService } from './bundle.service';
import { Post, Body, Get } from '@nestjs/common';
import { BundleData } from 'src/types/interface';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bundle')
@Controller('bundle')
export class BundleController {
  constructor(private readonly bundleService: BundleService) {}

  @Post()
  async createBundle(@Body() bundleData: CreateBundleDto): Promise<void> {
    await this.bundleService.createBundle(bundleData);
  }

  @Get()
  async getBundles(): Promise<BundleData[]> {
    return await this.bundleService.readBundlesFile();
  }

  @Get(':id')
  async getOneBundle(@Body() bundleId: number): Promise<BundleData> {
    return await this.bundleService.getOneBundle(bundleId);
  }
}

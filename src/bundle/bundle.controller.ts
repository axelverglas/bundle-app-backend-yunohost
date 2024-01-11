import { Controller, Param } from '@nestjs/common';
import { BundleService } from './bundle.service';
import { Post, Body, Get } from '@nestjs/common';
import { BundleData } from 'src/types/interface';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Bundle')
@Controller('bundle')
export class BundleController {
  constructor(private readonly bundleService: BundleService) {}

  @ApiOperation({ description: 'Create bundle' })
  @Post()
  async createBundle(@Body() bundleData: CreateBundleDto): Promise<void> {
    await this.bundleService.createBundle(bundleData);
  }

  @ApiOperation({ description: 'Get bundles' })
  @Get()
  async getBundles(): Promise<BundleData[]> {
    return await this.bundleService.readBundlesFile();
  }

  @ApiOperation({ description: 'Get one bundle' })
  @Get(':id')
  async getOneBundle(@Param('id') bundleId: number): Promise<BundleData> {
    return await this.bundleService.getOneBundle(bundleId);
  }
}

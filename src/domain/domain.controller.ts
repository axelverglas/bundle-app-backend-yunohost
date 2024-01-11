import { Controller, Get } from '@nestjs/common';
import { DomainService } from './domain.service';
import { ApiOperation, ApiTags, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('Domain')
@Controller('domain')
export class DomainController {
  constructor(private readonly domain: DomainService) {}

  @ApiOperation({ description: 'Get domains' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Domains not found.',
  })
  @Get('')
  async getDomains() {
    return await this.domain.getDomains();
  }
}

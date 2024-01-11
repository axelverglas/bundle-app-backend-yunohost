import { Controller, Get } from '@nestjs/common';
import { DomainService } from './domain.service';

@Controller('domain')
export class DomainController {
  constructor(private readonly domain: DomainService) {}

  @Get('')
  async getDomains() {
    return await this.domain.getDomains();
  }
}

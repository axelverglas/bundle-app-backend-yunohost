import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class DomainService {
  private execPromise = promisify(exec);

  async getDomains(): Promise<string> {
    const { stdout } = await this.execPromise(
      'sudo yunohost domain list --output-as json',
    );
    const domains = JSON.parse(stdout);
    return domains;
  }
}

import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class UserService {
  private execPromise = promisify(exec);
  async getAdminUser(): Promise<string> {
    const { stdout } = await this.execPromise(
      'sudo yunohost user list --output-as json',
    );
    const users = JSON.parse(stdout);
    const adminUser = users;
    return adminUser;
  }
}

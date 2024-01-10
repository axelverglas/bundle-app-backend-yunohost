import { Injectable } from '@nestjs/common';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class InstallService {
  private execPromise = promisify(exec);

  async installApps(appsData: any[]): Promise<any[]> {
    const installationResults = [];

    for (const appData of appsData) {
      const { appName, domain, path, password, adminUser } = appData;

      const command = 'sudo';
      const args = [
        `"-S yunohost app install ${appName} --args 'domain=${domain}&path=${path}&init_main_permission=admins&password=${password}&admin=${adminUser}'"`,
      ];

      try {
        const result = await this.runCommand(command, args);
        installationResults.push({
          appName,
          status: 'success',
          message: result,
        });
      } catch (error) {
        installationResults.push({
          appName,
          status: 'failed',
          message: error,
        });
      }
    }

    return installationResults;
  }

  runCommand(command: string, args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args, { shell: true });

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(stderr || `Command failed with exit code ${code}`);
        }
      });
    });
  }

  async getAdminUser(): Promise<string> {
    const { stdout } = await this.execPromise(
      'yunohost user list --admin --output-as json',
    );
    const users = JSON.parse(stdout);
    const adminUser = users;
    return adminUser;
  }
}

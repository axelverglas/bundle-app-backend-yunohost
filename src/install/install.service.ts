import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { InstallGateway } from './install.gateway';

@Injectable()
export class InstallService {
  constructor(private installGateway: InstallGateway) {}
  async installApps(appsData: any[]): Promise<any[]> {
    const installationResults = [];

    for (const appData of appsData) {
      const { appName, domain, path, password } = appData;

      const command = 'sudo';
      const args = [
        'yunohost',
        'app',
        'install',
        appName,
        '--args',
        `domain=${domain}&path=${path}&init_main_permission=admins&password=${password}`,
      ];

      try {
        const result = await this.runCommand(command, args, appName);
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

  runCommand(
    command: string,
    args: string[],
    appName: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args, { shell: true });

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        const message = data.toString();
        stdout += message;
        this.installGateway.sendProgressUpdate({
          appName,
          status: 'in-progress',
          message: message,
        });
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
}

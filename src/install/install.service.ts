import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { EventEmitter } from 'events';

@Injectable()
export class InstallService {
  private eventEmitter = new EventEmitter();
  async installApps(appsData: any[]): Promise<any[]> {
    const installationResults = [];

    for (const appData of appsData) {
      const { appName, domain, path, admin, password } = appData;

      const command = 'sudo';
      const args = [
        'yunohost',
        'app',
        'install',
        appName,
        '--args',
        `'domain=${domain}&path=${path}&init_main_permission=admins&admin=${admin}&password=${password}&user_home=false'`,
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

      process.stdout.once('data', (data) => {
        const message = data.toString();
        stdout += message;
        this.emitEvent('installUpdate', message);
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

  private emitEvent(eventName: string, data: string) {
    console.log(`Émission d'un événement ${eventName}:`, data);
    this.eventEmitter.emit(eventName, data);
  }

  getEmitter() {
    return this.eventEmitter;
  }
}

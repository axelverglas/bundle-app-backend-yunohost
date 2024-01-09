import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { exec } from 'child_process';

@Injectable()
export class InstallService {
  private execPromise = promisify(exec);

  async installApps(appsData: any[]): Promise<any[]> {
    const installationResults = [];

    for (const appData of appsData) {
      const { appName, mainDomain, appArgs } = appData;
      const appDomain = `${appName}.${mainDomain}`;

      try {
        await this.execPromise(
          `sudo ssh axel@51.158.74.176 yunohost domain add ${appDomain}`,
        );
        const { stdout } = await this.execPromise(
          `sudo yunohost app install ${appName} -a "${appArgs}"`,
        );

        installationResults.push({
          appName,
          status: 'success',
          message: stdout,
        });
      } catch (error) {
        installationResults.push({
          appName,
          status: 'failed',
          message: error.message,
        });
      }
    }

    return installationResults;
  }
}

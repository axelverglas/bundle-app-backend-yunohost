import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { AppData } from 'src/types/app';
import { join } from 'path';

@Injectable()
export class AppsService {
  private filePath = join(__dirname, '../../data/apps.json');

  async readJsonFile(): Promise<AppData[]> {
    try {
      const fileContent = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(fileContent) as AppData[];
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async writeJsonFile(data: AppData[]): Promise<void> {
    const fileContent = JSON.stringify(data, null, 2);
    await fs.writeFile(this.filePath, fileContent, 'utf8');
  }

  async addApp(appData: AppData): Promise<void> {
    const apps = await this.readJsonFile();
    const newId =
      apps.length > 0 ? Math.max(...apps.map((app) => app.id || 0)) + 1 : 1;
    appData.id = newId;
    apps.push(appData);
    await this.writeJsonFile(apps);
  }
}

import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { BundleData } from 'src/types/interface';
import { join } from 'path';

@Injectable()
export class BundleService {
  private filePath = join(__dirname, '../../data/bundles.json');

  async readBundlesFile(): Promise<BundleData[]> {
    try {
      const fileContent = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(fileContent) as BundleData[];
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async writeBundlesFile(data: BundleData[]): Promise<void> {
    const fileContent = JSON.stringify(data, null, 2);
    await fs.writeFile(this.filePath, fileContent, 'utf8');
  }

  async createBundle(bundleData: BundleData): Promise<void> {
    const bundles = await this.readBundlesFile();
    const newId =
      bundles.length > 0
        ? Math.max(...bundles.map((bundle) => bundle.id || 0)) + 1
        : 1;
    bundleData.id = newId;
    bundles.push(bundleData);
    await this.writeBundlesFile(bundles);
  }

  async getOneBundle(bundleId: number): Promise<BundleData> {
    const bundles = await this.readBundlesFile();
    return bundles.find((bundle) => bundle.id === Number(bundleId));
  }
}

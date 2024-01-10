export interface AppData {
  app_name: string;
  name: string;
  logo?: string;
  description: string;
  screenshot?: string;
}

export interface BundleData {
  id?: number;
  title: string;
  description: string;
  apps: AppData[];
}

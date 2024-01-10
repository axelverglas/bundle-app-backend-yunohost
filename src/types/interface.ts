export interface AppData {
  app_name: string;
  name: string;
  logo?: string;
  description: string;
  screenshot?: string;
}

export interface BundleData {
  title: string;
  description: string;
  apps: AppData[];
}

export type Config = {
  env: string;
  isProd: boolean;
  port: number;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  dbName: string;
  dbPort: number;
  apiKey: number;
  jwtSecret: string;
  emailPass?: string;
  emailUser?: string;
  dbUrl: string;
  key_storage_project_id: string;
};

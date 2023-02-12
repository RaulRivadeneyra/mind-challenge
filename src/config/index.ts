import httpConfig, { HTTPConfig } from './http.config';
import databaseConfig, { DatabaseConfig } from './db.config';
import authConfig, { AuthConfig } from './auth.config';
import { IsEnum } from 'class-validator';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.DEVELOPMENT;

  http: HTTPConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
}

export default [httpConfig, databaseConfig, authConfig];

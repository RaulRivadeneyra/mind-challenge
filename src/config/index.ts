import httpConfig, { HTTPConfig } from './http.config';
import databaseConfig, { DatabaseConfig } from './db.config';
import { IsEnum } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  http: HTTPConfig;
  database: DatabaseConfig;
}

export default [httpConfig, databaseConfig];

import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import constants from './constants';

export class DatabaseConfig {
  @IsString()
  URI: string;

  @IsString()
  DB: string;

  @IsString()
  USER: string;

  @IsString()
  PASSWORD: string;
}

export default registerAs(
  constants.CONFIGS.DATABASE,
  (): DatabaseConfig => ({
    URI: process.env.MONGODB_URI || 'mongodb://localhost/nest',
    DB: process.env.MONGODB_DB || 'nest',
    USER: process.env.MONGODB_USER || '',
    PASSWORD: process.env.MONGODB_PASSWORD || '',
  }),
);

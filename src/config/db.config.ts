import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConfigService, registerAs } from '@nestjs/config';
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

/*
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private dbConfig: DatabaseConfig;
  constructor(configService: ConfigService) {
    const dbConfig = configService.get<DatabaseConfig>('database');
    if (!dbConfig) {
      throw new Error('Database config not found');
    }
    this.dbConfig = dbConfig;
  }

  createMongooseOptions(): MongooseModuleOptions {
    const options = {
      uri: this.dbConfig.URI,
      dbName: this.dbConfig.DB,
      user: this.dbConfig.USER,
      pass: this.dbConfig.PASSWORD,
    };
    console.log(options);

    return options;
  }
}
*/

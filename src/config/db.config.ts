import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConfigService, registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';

export class DatabaseConfig {
  @IsString()
  URI?: string;

  @IsString()
  DB?: string;

  @IsString()
  USER?: string;

  @IsString()
  PASSWORD?: string;
}

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    URI: process.env.MONGODB_URI,
    DB: process.env.MONGODB_DB,
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
  }),
);

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService<DatabaseConfig>) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('URI'),
      dbName: this.configService.get<string>('DB'),
      user: this.configService.get<string>('USER'),
      pass: this.configService.get<string>('PASSWORD'),
    };
  }
}

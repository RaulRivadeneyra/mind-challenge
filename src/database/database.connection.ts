import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import databaseConfig from '../config/db.config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import constants from 'src/config/constants';

export const DatabaseConnection = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): MongooseModuleOptions => {
    const dbConfig: ConfigType<typeof databaseConfig> | undefined =
      configService.get(constants.CONFIGS.DATABASE);
    if (!dbConfig) throw new Error('Database config not found');
    return {
      uri: dbConfig.URI,
      dbName: dbConfig.DB,
      user: dbConfig.USER,
      pass: dbConfig.PASSWORD,
    };
  },
};

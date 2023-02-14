import { ConfigType } from '@nestjs/config';
import databaseConfig from '../config/db.config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const DatabaseConnection = {
  useFactory: (
    dbConfig: ConfigType<typeof databaseConfig>,
  ): MongooseModuleOptions => {
    return {
      uri: dbConfig.URI,
      dbName: dbConfig.DB,
      user: dbConfig.USER,
      pass: dbConfig.PASSWORD,
    };
  },
  inject: [databaseConfig.KEY],
};

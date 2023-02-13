import * as mongoose from 'mongoose';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '../config/db.config';
import constants from '../config/constants';

export const DatabaseConnection = {
  provide: constants.CONNECTIONS.MONGODB,
  useFactory: (
    dbConfig: ConfigType<typeof databaseConfig>,
  ): Promise<typeof mongoose> => {
    const uri = dbConfig.URI;

    const options = {
      dbName: dbConfig.DB,
      user: dbConfig.USER,
      pass: dbConfig.PASSWORD,
    };
    mongoose.set('strictQuery', true);
    return mongoose.connect(uri, options);
  },
  inject: [databaseConfig.KEY],
};

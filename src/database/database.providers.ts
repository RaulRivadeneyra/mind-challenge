import * as mongoose from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/config/db.config';
import constants from 'src/config/constants';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    inject: [ConfigModule],
    provide: constants.CONNECTIONS.MONGODB,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
      const dbConfig = configService.get<DatabaseConfig>(
        constants.CONFIGS.DATABASE,
      );
      if (!dbConfig) {
        // Todo: Don't hardcode this error message
        throw new Error('Database config not found');
      }
      const options = {
        dbName: dbConfig.DB,
        user: dbConfig.USER,
        pass: dbConfig.PASSWORD,
      };
      return mongoose.connect(dbConfig.URI, options);
    },
  },
];

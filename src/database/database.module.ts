import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/db.config';

import { DatabaseConnection } from './database.connection';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [DatabaseConnection],
  exports: [DatabaseConnection],
})
export class DatabaseModule {}

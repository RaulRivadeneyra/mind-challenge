import { Module } from '@nestjs/common';
import { AppControllerV1 } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import config from './config';

import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/authentication/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConnection } from './database/database.connection';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      envFilePath: ['.env', '.env.local'],
      validate,
      cache: true,
    }),
    MongooseModule.forRootAsync(DatabaseConnection),
    UsersModule,
    AccountsModule,
    AuthModule,
  ],
  controllers: [AppControllerV1],
  providers: [AppService],
})
export class AppModule {}

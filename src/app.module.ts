import { Module } from '@nestjs/common';
import { AppControllerV1 } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import config from './config';

import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      envFilePath: ['.env', '.env.local'],
      validate,
      cache: true,
    }),
    UsersModule,
    AccountsModule,
    AuthModule,
  ],
  controllers: [AppControllerV1],
  providers: [AppService],
})
export class AppModule {}

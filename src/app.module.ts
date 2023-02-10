import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppControllerV1 } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import config from './config';
import { MongooseConfigService } from './config/db.config';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      envFilePath: ['.env', '.env.local'],
      validate,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigModule],
    }),
    UsersModule,
  ],
  controllers: [AppControllerV1],
  providers: [AppService],
})
export class AppModule {}

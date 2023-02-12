import { Module } from '@nestjs/common';
import { UsersControllerV1 } from './users.controller';
import { UsersServiceV1 } from './users.service';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UsersControllerV1],
  providers: [UsersServiceV1, UsersRepository, ...usersProviders],
  exports: [UsersServiceV1],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersControllerV1 } from './users.controller';
import { UsersServiceV1 } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersControllerV1],
  providers: [UsersServiceV1, UsersRepository],
  exports: [UsersServiceV1],
})
export class UsersModule {}

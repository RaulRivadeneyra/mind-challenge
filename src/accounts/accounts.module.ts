import { Module } from '@nestjs/common';
import { AccountsControllerV1 } from './accounts.controller';
import { AccountServiceV1 } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AccountsControllerV1],
  providers: [AccountServiceV1, AccountsRepository],
  exports: [AccountServiceV1],
})
export class AccountsModule {}

import { Account } from './schemas/account.schema';
import { CreateAccountDTO, UpdateAccountDTO } from './dtos';
import { Injectable } from '@nestjs/common';

import { AccountsRepository } from './accounts.repository';
import { BaseCRUDService } from 'src/common/base-crud.service';

export type IAccountsService = BaseCRUDService<
  Account,
  CreateAccountDTO,
  UpdateAccountDTO
>;

@Injectable()
export class AccountsService extends BaseCRUDService<
  Account,
  CreateAccountDTO,
  UpdateAccountDTO
> {
  constructor(protected readonly repository: AccountsRepository) {
    super(repository);
  }
}

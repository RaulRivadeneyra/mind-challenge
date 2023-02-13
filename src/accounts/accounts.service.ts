import { Account } from './schemas/account.schema';
import { CreateAccountDTO, UpdateAccountDTO } from './dtos';
import { Injectable } from '@nestjs/common';

import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountServiceV1 {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async create(account: CreateAccountDTO): Promise<Account> {
    return this.accountsRepository.create(account);
  }

  async getById(id: string): Promise<Account | null> {
    return this.accountsRepository.findOne({ _id: id });
  }

  //TODO: Add pagination
  async getAll(): Promise<Account[] | null> {
    return this.accountsRepository.find({});
  }

  async update(id: string, account: UpdateAccountDTO): Promise<Account | null> {
    return this.accountsRepository.findOneAndUpdate({ _id: id }, account);
  }

  async delete(id: string): Promise<boolean> {
    return this.accountsRepository.deleteOne({ _id: id });
  }
}

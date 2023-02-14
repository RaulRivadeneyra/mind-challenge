import { stub } from '../test/stubs/account.stub';
import { IAccountsService } from '../accounts.service';

export const AccountsService = jest.fn().mockImplementation(
  (): Omit<IAccountsService, 'repository'> => ({
    findOne: jest.fn().mockResolvedValue(stub()),
    findAll: jest.fn().mockResolvedValue([stub()]),
    create: jest.fn().mockResolvedValue(stub()),
    update: jest.fn().mockResolvedValue(stub()),
    deleteOne: jest.fn().mockResolvedValue(true),
    deleteMany: jest.fn().mockResolvedValue(true),
  }),
);

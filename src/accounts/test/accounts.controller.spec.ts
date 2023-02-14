import { Test } from '@nestjs/testing';

import { Account } from '../schemas/account.schema';

import { AccountsController } from '../accounts.controller';
import { AccountsService } from '../accounts.service';
import { stub } from './stubs/account.stub';
import { CreateAccountDTO } from '../dtos';

jest.mock('../accounts.service');

describe('AccountsController', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    }).compile();
    service = moduleRef.get<AccountsService>(AccountsService);
    controller = moduleRef.get<AccountsController>(AccountsController);
    jest.clearAllMocks();
  });

  describe('getAccount', () => {
    describe('when getAccount is called', () => {
      let account: Account | null;
      const mockAccount = stub();
      const id = mockAccount._id.toString();
      beforeEach(async () => {
        account = await controller.getAccount(id);
      });

      it('should call accountsService', () => {
        expect(service.findOne).toBeCalledWith(id);
      });

      it('should return an account', () => {
        expect(account).toEqual(mockAccount);
      });
    });
  });

  describe('getAccounts', () => {
    describe('when getAccounts is called', () => {
      let accounts: Account[] | null;
      const mockAccounts = [stub()];
      beforeEach(async () => {
        accounts = await controller.getAccounts();
      });

      it('should call accountsService', () => {
        expect(service.findAll).toBeCalled();
      });

      it('should return accounts', () => {
        expect(accounts).toEqual(mockAccounts);
      });
    });
  });

  describe('createAccount', () => {
    describe('when createAccount is called', () => {
      let account: Account | null;
      const mockAccount = stub();
      const accountDTO: CreateAccountDTO = {
        name: mockAccount.name,
        responsible: mockAccount.responsible.toString(),
        clientName: mockAccount.clientName,
        team: mockAccount.team.map((team) => ({
          ...team,
          userId: team.userId.toString(),
        })),
      };
      beforeEach(async () => {
        account = await controller.createAccount(accountDTO);
      });

      it('should call accountsService', () => {
        expect(service.create).toHaveBeenCalledWith(accountDTO);
      });

      it('should return an account', () => {
        expect(account).toEqual(mockAccount);
      });
    });
  });

  describe('updateAccount', () => {
    describe('when updateAccount is called', () => {
      let account: Account | null;
      const mockAccount = stub();
      const id = mockAccount._id.toString();
      const accountDTO = {
        name: mockAccount.name,
        responsible: mockAccount.responsible.toString(),
        clientName: mockAccount.clientName,
        team: mockAccount.team.map((team) => ({
          ...team,
          userId: team.userId.toString(),
        })),
      };
      beforeEach(async () => {
        account = await controller.updateAccount(id, accountDTO);
      });

      it('should call accountsService', () => {
        expect(service.update).toHaveBeenCalledWith(id, accountDTO);
      });

      it('should return an account', () => {
        expect(account).toEqual(mockAccount);
      });
    });
  });
});

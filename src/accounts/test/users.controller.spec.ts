import { Test } from '@nestjs/testing';
import { CreateAccountDTO } from '../dtos/create-account.dto';
import { UpdateAccountDTO } from '../dtos/update-account.dto';
import { Account } from '../schemas/account.schema';

import { AccountsControllerV1 } from '../accounts.controller';
import { AccountServiceV1 } from '../accounts.service';
import { stub } from './stubs/user.stub';

jest.mock('../users.service');

describe('UsersController', () => {
  let controller: AccountsControllerV1;
  let services: AccountServiceV1;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountsControllerV1],
      providers: [AccountServiceV1],
    }).compile();
    services = moduleRef.get<AccountServiceV1>(AccountServiceV1);
    controller = moduleRef.get<AccountsControllerV1>(AccountsControllerV1);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let account: Account | null;

      beforeEach(async () => {
        account = await controller.getUser(stub()._id.toString());
      });

      it('should call usersService', () => {
        expect(services.getById).toBeCalledWith(stub()._id.toString());
      });

      it('should return a user', () => {
        expect(account).toEqual(stub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let accounts: Account[] | null;

      beforeEach(async () => {
        accounts = await controller.getAccounts();
      });

      it('should call usersService', () => {
        expect(services.getAll).toHaveBeenCalled();
      });

      it('should return users', () => {
        expect(accounts).toEqual([stub()]);
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let account: Account;
      let createDTO: CreateAccountDTO;

      beforeEach(async () => {
        createDTO = {
          name: stub().name,
          clientName: stub().clientName,
          responsible: stub().responsible.toString(),
          team: stub().team.map((team) => ({
            ...team,
            userId: team.userId.toString(),
          })),
        };
        account = await controller.createAccounts(createDTO);
      });

      it('should call usersService', () => {
        expect(services.create).toHaveBeenCalledWith(createDTO);
      });

      it('should return a user', () => {
        expect(account).toEqual(stub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let account: Account | null;
      let updateDTO: UpdateAccountDTO;

      beforeEach(async () => {
        updateDTO = {
          clientName: 'David',
        };
        account = await controller.updateAccounts(
          stub()._id.toString(),
          updateDTO,
        );
      });

      it('should call usersService', () => {
        expect(services.update).toHaveBeenCalledWith(
          stub()._id.toString(),
          updateDTO,
        );
      });

      it('should return a user', () => {
        expect(account).toEqual(stub());
      });
    });
  });
});

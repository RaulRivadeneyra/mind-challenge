import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { Account } from '../schemas/account.schema';
import { AccountsRepository } from '../accounts.repository';
import { stub } from './stubs/account.stub';
import { AccountModel } from './support/account.model';
import constants from '../../config/constants';
import { getModelToken } from '@nestjs/mongoose';

const modelName = constants.MODELS.ACCOUNT;

describe('AccountsRepository', () => {
  let repository: AccountsRepository;
  describe('find operations', () => {
    let model: AccountModel;
    let filterQuery: FilterQuery<Account>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          AccountsRepository,
          {
            provide: getModelToken(modelName),
            useClass: AccountModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<AccountsRepository>(AccountsRepository);
      model = moduleRef.get<AccountModel>(getModelToken(modelName));

      filterQuery = {
        _id: stub()._id.toString(),
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      let account: Account | null;

      beforeEach(async () => {
        jest.spyOn(model, 'findOne');
        account = await repository.findOne(filterQuery);
      });

      it('should call the accountModel', () => {
        expect(model.findOne).toHaveBeenCalled();
      });

      it('should return an account', () => {
        expect(account).toEqual(stub());
      });
    });

    describe('findAll', () => {
      let accounts: Account[] | null;

      beforeEach(async () => {
        jest.spyOn(model, 'find');
        accounts = await repository.find(filterQuery);
      });

      it('should call the accountModel', () => {
        expect(model.find).toHaveBeenCalled();
      });

      it('should return an account', () => {
        expect(accounts).toEqual([stub()]);
      });
    });

    describe('findOneAndUpdate', () => {
      let account: Account | null;

      beforeEach(async () => {
        jest.spyOn(model, 'findOneAndUpdate');
        account = await repository.findOneAndUpdate(filterQuery, stub());
      });

      it('should call the accountModel', () => {
        expect(model.findOneAndUpdate).toHaveBeenCalled();
      });

      it('should return an account', () => {
        expect(account).toEqual(stub());
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          AccountsRepository,
          {
            provide: getModelToken(modelName),
            useValue: AccountModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<AccountsRepository>(AccountsRepository);
    });
    describe('create', () => {
      let account: Account;
      let saveSpy: jest.SpyInstance;
      let constructorSpy: jest.SpyInstance;

      beforeEach(async () => {
        saveSpy = jest.spyOn(AccountModel.prototype, 'save');
        constructorSpy = jest.spyOn(AccountModel.prototype, 'constructorSpy');
        account = await repository.create(stub());
      });

      it('should call the accountModel', () => {
        expect(saveSpy).toHaveBeenCalled();
        expect(constructorSpy).toHaveBeenCalledWith(stub());
      });

      it('should return an account', () => {
        expect(account).toEqual(stub());
      });
    });
  });

  describe('delete operations', () => {
    let model: AccountModel;
    let filterQuery: FilterQuery<Account>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          AccountsRepository,
          {
            provide: getModelToken(modelName),
            useClass: AccountModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<AccountsRepository>(AccountsRepository);
      model = moduleRef.get<AccountModel>(getModelToken(modelName));

      filterQuery = {
        _id: stub()._id.toString(),
      };

      jest.clearAllMocks();
    });

    describe('deleteOne', () => {
      let isDeleted: boolean;

      beforeEach(async () => {
        jest.spyOn(model, 'deleteOne');
        isDeleted = await repository.deleteOne(filterQuery);
      });

      it('should call the accountModel', () => {
        expect(model.deleteOne).toHaveBeenCalled();
      });

      it('should return true', () => {
        expect(isDeleted).toBe(true);
      });
    });

    describe('deleteMany', () => {
      let isDeleted: boolean;

      beforeEach(async () => {
        jest.spyOn(model, 'deleteMany');
        isDeleted = await repository.deleteMany(filterQuery);
      });

      it('should call the accountModel', () => {
        expect(model.deleteMany).toHaveBeenCalled();
      });

      it('should return true', () => {
        expect(isDeleted).toBe(true);
      });
    });
  });
});

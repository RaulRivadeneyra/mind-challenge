import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery, Types } from 'mongoose';
import { Account } from '../schemas/account.schema';
import { AccountsRepository } from '../accounts.repository';
import { stub } from './stubs/user.stub';
import { AccountModel } from './support/user.model';
import constants from '../../config/constants';
import { DatabaseModule } from '../../database/database.module';

const modelName = constants.MODELS.USER;

describe('UsersRepository', () => {
  let repository: AccountsRepository;

  describe('find operations', () => {
    let model: AccountModel;
    let filterQuery: FilterQuery<Account>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [DatabaseModule],
        providers: [
          AccountsRepository,
          {
            provide: getModelToken(constants.MODELS.ACCOUNT),
            useClass: AccountModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<AccountsRepository>(AccountsRepository);
      model = moduleRef.get<AccountModel>(
        getModelToken(constants.MODELS.ACCOUNT),
      );

      filterQuery = {
        _id: new Types.ObjectId(stub()._id),
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let account: Account | null;

        beforeEach(async () => {
          jest.spyOn(model, 'findOne');
          account = await repository.findOne(filterQuery);
        });

        test('then it should call the userModel', () => {
          expect(model.findOne).toHaveBeenCalled();
        });

        test('then it should return a user', () => {
          expect(account).toEqual(stub());
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let accounts: Account[] | null;

        beforeEach(async () => {
          jest.spyOn(model, 'find');
          accounts = await repository.find(filterQuery);
        });

        test('then it should call the userModel', () => {
          expect(model.find).toHaveBeenCalledWith(
            filterQuery,
            undefined,
            undefined,
          );
        });

        test('then it should return a user', () => {
          expect(accounts).toEqual([stub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let account: Account | null;

        beforeEach(async () => {
          jest.spyOn(model, 'findOneAndUpdate');
          account = await repository.findOneAndUpdate(filterQuery, stub());
        });

        test('then it should call the userModel', () => {
          expect(model.findOneAndUpdate).toHaveBeenCalledWith(
            filterQuery,
            stub(),
            { new: true },
          );
        });

        test('then it should return a user', () => {
          expect(account).toEqual(stub());
        });
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

    describe.skip('create', () => {
      describe('when create is called', () => {
        let account: Account;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(AccountModel.prototype, 'save');
          constructorSpy = jest.spyOn(AccountModel.prototype, 'constructorSpy');
          account = await repository.create(stub());
        });

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(stub());
        });

        test('then it should return a user', () => {
          expect(account).toEqual(stub());
        });
      });
    });
  });
});

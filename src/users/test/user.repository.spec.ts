import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery, Types } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UsersRepository } from '../users.repository';
import { userStub } from './stubs/user.stub';
import { UserModel } from './support/user.model';
import constants from '../../config/constants';

const modelName = constants.MODELS.USER;

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  describe('find operations', () => {
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(modelName),
            useClass: UserModel,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
      userModel = moduleRef.get<UserModel>(getModelToken(modelName));

      userFilterQuery = {
        _id: new Types.ObjectId(userStub()._id),
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let user: User | null;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOne');
          user = await usersRepository.findOne(userFilterQuery);
        });

        test('then it should call the userModel', () => {
          expect(userModel.findOne).toHaveBeenCalled();
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let users: User[] | null;

        beforeEach(async () => {
          jest.spyOn(userModel, 'find');
          users = await usersRepository.find(userFilterQuery);
        });

        test('then it should call the userModel', () => {
          expect(userModel.find).toHaveBeenCalledWith(
            userFilterQuery,
            undefined,
            undefined,
          );
        });

        test('then it should return a user', () => {
          expect(users).toEqual([userStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let user: User | null;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOneAndUpdate');
          user = await usersRepository.findOneAndUpdate(
            userFilterQuery,
            userStub(),
          );
        });

        test('then it should call the userModel', () => {
          expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
            userFilterQuery,
            userStub(),
            { new: true },
          );
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(modelName),
            useValue: UserModel,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    });

    describe.skip('create', () => {
      describe('when create is called', () => {
        let user: User;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'save');
          constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
          user = await usersRepository.create(userStub());
        });

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(userStub());
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
  });
});

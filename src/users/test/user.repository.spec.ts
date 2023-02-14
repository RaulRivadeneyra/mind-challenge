import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UsersRepository } from '../users.repository';
import { stub } from './stubs/user.stub';
import { UserModel } from './support/user.model';
import constants from '../../config/constants';
import { getModelToken } from '@nestjs/mongoose';

const modelName = constants.MODELS.USER;

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let model: UserModel;
  let filterQuery: FilterQuery<User>;

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

    repository = moduleRef.get<UsersRepository>(UsersRepository);
    model = moduleRef.get<UserModel>(getModelToken(modelName));
    filterQuery = { _id: stub()._id };
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User | null;

      beforeEach(async () => {
        jest.spyOn(model, 'findOne');
        user = await repository.findOne(filterQuery);
      });

      it('should call the accountModel', () => {
        expect(model.findOne).toHaveBeenCalled();
      });

      it('should return an account', () => {
        expect(user).toEqual(stub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[] | null;

      beforeEach(async () => {
        jest.spyOn(model, 'find');
        users = await repository.find(filterQuery);
      });

      it('should call the userModel', () => {
        expect(model.find).toHaveBeenCalled();
      });

      it('should return users', () => {
        expect(users).toEqual([stub()]);
      });
    });
  });

  describe('findOneAndUpdate', () => {
    let user: User | null;

    beforeEach(async () => {
      jest.spyOn(model, 'findOneAndUpdate');
      user = await repository.findOneAndUpdate(filterQuery, stub());
    });

    it('should call the userModel', () => {
      expect(model.findOneAndUpdate).toHaveBeenCalled();
    });

    it('should return an account', () => {
      expect(user).toEqual(stub());
    });
  });
});

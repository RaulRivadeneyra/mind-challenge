import { Test } from '@nestjs/testing';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { User } from '../schemas/user.schema';

import { UsersControllerV1 } from '../users.controller';
import { UsersServiceV1 } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersControllerV1;
  let usersService: UsersServiceV1;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersControllerV1],
      providers: [UsersServiceV1],
    }).compile();
    usersService = moduleRef.get<UsersServiceV1>(UsersServiceV1);
    usersController = moduleRef.get<UsersControllerV1>(UsersControllerV1);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User | null;

      beforeEach(async () => {
        user = await usersController.getUser(userStub()._id);
      });

      it('should call usersService', () => {
        expect(usersService.getUser).toBeCalledWith({ _id: userStub()._id });
      });

      it('should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[] | null;

      beforeEach(async () => {
        users = await usersController.getUsers();
      });

      it('should call usersService', () => {
        expect(usersService.getUsers).toHaveBeenCalled();
      });

      it('should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDTO: CreateUserDTO;

      beforeEach(async () => {
        createUserDTO = {
          firstName: userStub().firstName,
          lastName: userStub().lastName,
          email: userStub().email,
          password: userStub().password,
        };
        user = await usersController.createUser(createUserDTO);
      });

      it('should call usersService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(createUserDTO);
      });

      it('should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User | null;
      let updateUserDTO: UpdateUserDTO;

      beforeEach(async () => {
        updateUserDTO = {
          firstName: 'David',
        };
        user = await usersController.updateUser(userStub()._id, updateUserDTO);
      });

      it('should call usersService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(
          { _id: userStub()._id },
          updateUserDTO,
        );
      });

      it('should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});

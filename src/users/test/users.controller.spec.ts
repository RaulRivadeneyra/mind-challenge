import { Test } from '@nestjs/testing';

import { Role, User } from '../schemas/user.schema';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { stub } from './stubs/user.stub';
import { CreateUserDTO } from '../dtos';

jest.mock('../users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
    service = moduleRef.get<UsersService>(UsersService);
    controller = moduleRef.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User | null;
      const mockUser = stub();
      const id = mockUser._id.toString();
      beforeEach(async () => {
        user = await controller.getUser(id);
      });

      it('should call usersService', () => {
        expect(service.findOne).toBeCalledWith(id);
      });

      it('should return an user', () => {
        expect(user).toEqual(mockUser);
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[] | null;
      const mockUsers = [stub()];
      beforeEach(async () => {
        users = await controller.getUsers();
      });

      it('should call usersService', () => {
        expect(service.findAll).toBeCalled();
      });

      it('should return users', () => {
        expect(users).toEqual(mockUsers);
      });
    });
  });

  describe('createUser', () => {
    describe('when super user creates an admin user', () => {
      let user: User | null;
      const mockUser = stub();
      const userDTO: CreateUserDTO = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        password: mockUser.password,
        role: mockUser.role as CreateUserDTO['role'],
      };
      beforeEach(async () => {
        user = await controller.createUser(userDTO, Role.SUPER);
      });

      it('should call usersService', () => {
        expect(service.create).toHaveBeenCalledWith(userDTO);
      });

      it('should return an user', () => {
        expect(user).toEqual(mockUser);
      });
    });

    describe('when admin user creates an admin user', () => {
      const mockUser = stub();
      const userDTO: CreateUserDTO = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        password: mockUser.password,
        role: mockUser.role as CreateUserDTO['role'],
      };

      it('should throw an error', async () => {
        await expect(
          async () => await controller.createUser(userDTO, Role.ADMIN),
        ).rejects.toThrowError();
      });
    });

    describe('when admin user creates a user', () => {
      let user: User | null;
      const mockUser = stub();
      const userDTO: CreateUserDTO = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        password: mockUser.password,
        role: Role.NORMAL,
      };
      beforeEach(async () => {
        user = await controller.createUser(userDTO, Role.ADMIN);
      });

      it('should call usersService', () => {
        expect(service.create).toHaveBeenCalledWith(userDTO);
      });

      it('should return an user', () => {
        expect(user).toEqual(mockUser);
      });
    });
  });

  describe('updateUser', () => {
    describe('when super user updates an admin user', () => {
      let user: User | null;
      const mockUser = stub();
      const id = mockUser._id.toString();
      const userDTO: CreateUserDTO = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        password: mockUser.password,
        role: mockUser.role as CreateUserDTO['role'],
      };
      beforeEach(async () => {
        user = await controller.updateUser(id, userDTO);
      });

      it('should call usersService', () => {
        expect(service.update).toHaveBeenCalledWith(id, userDTO);
      });

      it('should return an user', () => {
        expect(user).toEqual(mockUser);
      });
    });
  });

  describe('deleteUser', () => {
    describe('when super user deletes an admin user', () => {
      let isDeleted: boolean;
      const mockUser = stub();
      const id = mockUser._id.toString();
      beforeEach(async () => {
        isDeleted = await controller.deleteUser(id);
      });

      it('should call usersService', () => {
        expect(service.deleteOne).toHaveBeenCalledWith(id);
      });

      it('should return an user', () => {
        expect(isDeleted).toEqual(true);
      });
    });
  });

  describe('deleteUsers', () => {
    describe('when super user deletes all users', () => {
      let isDeleted: boolean;
      const mockUser = stub();
      const id = mockUser._id.toString();
      beforeEach(async () => {
        isDeleted = await controller.deleteUsers([id]);
      });

      it('should call usersService', () => {
        expect(service.deleteMany).toBeCalled();
      });

      it('should return an user', () => {
        expect(isDeleted).toEqual(true);
      });
    });
  });
});

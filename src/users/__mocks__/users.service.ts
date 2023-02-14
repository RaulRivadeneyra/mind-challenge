import { stub } from '../test/stubs/user.stub';
import { IUsersService } from '../users.service';

export const UsersService = jest.fn().mockImplementation(
  (): Omit<IUsersService, 'repository'> => ({
    findOne: jest.fn().mockResolvedValue(stub()),
    findAll: jest.fn().mockResolvedValue([stub()]),
    create: jest.fn().mockResolvedValue(stub()),
    update: jest.fn().mockResolvedValue(stub()),
    deleteOne: jest.fn().mockResolvedValue(true),
    deleteMany: jest.fn().mockResolvedValue(true),
    findByEmail: jest.fn().mockResolvedValue(stub()),
    changeRole: jest.fn().mockResolvedValue(stub()),
  }),
);

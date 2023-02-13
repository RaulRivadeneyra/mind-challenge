import { stub } from '../test/stubs/user.stub';

export const UsersServiceV1 = jest.fn().mockImplementation(() => ({
  getUserById: jest.fn().mockResolvedValue(stub()),
  getUsers: jest.fn().mockResolvedValue([stub()]),
  createUser: jest.fn().mockResolvedValue(stub()),
  updateUser: jest.fn().mockResolvedValue(stub()),
}));

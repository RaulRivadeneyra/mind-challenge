import { userStub } from '../test/stubs/user.stub';

export const UsersServiceV1 = jest.fn().mockImplementation(() => ({
  getUserById: jest.fn().mockResolvedValue(userStub()),
  getUsers: jest.fn().mockResolvedValue([userStub()]),
  createUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
}));

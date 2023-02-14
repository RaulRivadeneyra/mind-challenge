import { Types } from 'mongoose';
import { Role, User } from '../../schemas/user.schema';

export const stub = (): User => {
  return {
    _id: new Types.ObjectId('5f7b5b9b9c9d9b1b8c8c8c8c'),
    email: 'test@example.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'User',
    role: Role.ADMIN,
  };
};

import { Types } from 'mongoose';
import { Account } from '../../schemas/account.schema';

export const stub = (): Account => {
  return {
    _id: new Types.ObjectId('5f7b5b9b9c9d9b1b8c8c8c7c'),
    name: 'Test Account',
    clientName: 'Test Client',
    responsible: new Types.ObjectId('5f7b5b9b9c9d9b1b8c8c8c8c'),
    team: [
      {
        userId: new Types.ObjectId('5f7b5b9b9c9d9b1b8c8c8c8c'),
        startedAt: new Date('2023-02-14T17:07:56.097Z'),
      },
    ],
  };
};

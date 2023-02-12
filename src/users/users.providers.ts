import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import constants from '../config/constants';

export const usersProviders = [
  {
    provide: constants.MODELS.USER,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [constants.CONNECTIONS.MONGODB],
  },
];

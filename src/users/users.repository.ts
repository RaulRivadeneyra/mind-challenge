import { Inject, Injectable } from '@nestjs/common';

import { Connection, Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import constants from '../config/constants';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { DatabaseConnection } from '../database/database.connection';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(@Inject(DatabaseConnection.provide) connection: Connection) {
    const userModel = connection.model(
      constants.MODELS.USER,
      UserSchema,
    ) as Model<UserDocument>;
    super(userModel);
  }
}

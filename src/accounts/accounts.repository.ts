import { Inject, Injectable } from '@nestjs/common';

import { Connection, Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import constants from '../config/constants';
import { AccountDocument, AccountSchema } from './schemas/account.schema';
import { DatabaseConnection } from '../database/database.connection';

@Injectable()
export class AccountsRepository extends EntityRepository<AccountDocument> {
  constructor(@Inject(DatabaseConnection.provide) connection: Connection) {
    const model = connection.model(
      constants.MODELS.ACCOUNT,
      AccountSchema,
    ) as Model<AccountDocument>;
    super(model);
  }
}

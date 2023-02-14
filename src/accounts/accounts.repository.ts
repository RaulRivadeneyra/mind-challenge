import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import constants from '../config/constants';
import { AccountDocument } from './schemas/account.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountsRepository extends EntityRepository<AccountDocument> {
  constructor(
    @InjectModel(constants.MODELS.ACCOUNT) model: Model<AccountDocument>,
  ) {
    super(model);
  }
}

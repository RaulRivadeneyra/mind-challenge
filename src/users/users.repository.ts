import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import constants from '../config/constants';
import { UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(constants.MODELS.USER) model: Model<UserDocument>) {
    super(model);
  }
}

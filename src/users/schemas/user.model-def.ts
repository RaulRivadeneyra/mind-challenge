import { ModelDefinition } from '@nestjs/mongoose';
import constants from '../../config/constants';
import { UserSchema } from './user.schema';

export const UserModelDefinition: ModelDefinition = {
  name: constants.MODELS.USER,
  schema: UserSchema,
};

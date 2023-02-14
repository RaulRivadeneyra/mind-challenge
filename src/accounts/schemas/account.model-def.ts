import { ModelDefinition } from '@nestjs/mongoose';
import constants from '../../config/constants';
import { AccountSchema } from './account.schema';

export const AccountModelDefinition: ModelDefinition = {
  name: constants.MODELS.ACCOUNT,
  schema: AccountSchema,
};

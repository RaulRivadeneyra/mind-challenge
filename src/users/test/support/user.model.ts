import { MockModel } from '../../../database/test/support/mock.model';
import { User } from '../../schemas/user.schema';
import { stub } from '../stubs/user.stub';

export class UserModel extends MockModel<User> {
  protected entityStub = stub();
}

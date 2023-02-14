import { MockModel } from '../../../database/test/support/mock.model';
import { Account } from '../../schemas/account.schema';
import { stub } from '../stubs/account.stub';

export class AccountModel extends MockModel<Account> {
  protected entityStub = stub();
}

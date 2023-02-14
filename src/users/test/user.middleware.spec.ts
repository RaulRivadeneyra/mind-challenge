import * as sinon from 'sinon';
import * as _ from 'lodash';
import { Role } from '../schemas/user.schema';
import userMiddleware from '../schemas/user.middleware';

describe('pre-save middleware', () => {
  it('should hash password', async () => {
    const userDoc = {
      firstName: 'Polly',
      lastName: 'Parrot',
      email: 'polly@parrot.com',
      password: 'password',
      role: Role.ADMIN,
      isModified: () => true,
    };
    const thisContext = userDoc;
    const boundMiddlewareFunc = _.bind(userMiddleware.pre.save, thisContext);
    const next = sinon.spy();

    await boundMiddlewareFunc(next);

    expect(userDoc.password).not.toBe('password');

    sinon.assert.calledOnce(next);
  });
  it('should not hash password', async () => {
    const userDoc = {
      firstName: 'Polly',
      lastName: 'Parrot',
      email: 'polly@parrot.com',
      password: 'password',
      role: Role.ADMIN,
      isModified: () => false,
    };
    const thisContext = userDoc;
    const boundMiddlewareFunc = _.bind(userMiddleware.pre.save, thisContext);
    const next = sinon.spy();

    await boundMiddlewareFunc(next);

    expect(userDoc.password).toBe('password');

    sinon.assert.calledOnce(next);
  });
});

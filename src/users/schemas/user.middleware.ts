import { hashPassword } from '../../utils/security';
import { User } from './user.schema';

async function hashPasswordMiddleware(next: () => void) {
  if (!this.isModified('password')) return next();
  const user = this as User;
  user.password = await hashPassword(user.password);
  next();
}

export default {
  pre: {
    save: hashPasswordMiddleware,
  },
};

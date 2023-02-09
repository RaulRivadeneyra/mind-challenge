import { hashPassword } from '../../utils/security';
import { UserDocument } from './user.schema';

async function hashPasswordMiddleware(next: () => void) {
  if (!this.isModified('password')) return next();
  const user = this as UserDocument;
  user.password = await hashPassword(user.password);
  next();
}

export default {
  pre: {
    save: hashPasswordMiddleware,
  },
};

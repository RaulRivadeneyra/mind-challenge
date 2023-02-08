import * as bycrypt from 'bcrypt';

const SALT_ROUNDS = 9;

export const hashPassword = async (password: string) => {
  const salt = await bycrypt.genSalt(SALT_ROUNDS);
  return bycrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return bycrypt.compare(password, hash);
};

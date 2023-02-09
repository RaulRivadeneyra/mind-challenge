import { hashPassword, comparePassword } from '../security';

describe('security', () => {
  it('should hash and compare password', async () => {
    const password = 'password';
    const hash = await hashPassword(password);
    expect(await comparePassword(password, hash)).toBe(true);
  });

  it('should not compare password', async () => {
    const password = 'password';
    const hash = await hashPassword(password);
    expect(await comparePassword('wrong', hash)).toBe(false);
  });
});

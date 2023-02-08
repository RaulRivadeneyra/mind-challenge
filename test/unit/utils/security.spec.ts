import { hashPassword, comparePassword } from '@/utils/security';

describe('security', () => {
  it('should hash password', async () => {
    const password = 'password';
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
  });

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

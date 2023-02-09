import { Injectable } from '@nestjs/common';
import { UsersServiceV1 } from '../users/users.service';
import { comparePassword } from '../utils/security';

type EmailOrId = { email: string } | { _id: string };

@Injectable()
export class AuthService {
  constructor(private usersService: UsersServiceV1) {}

  async validateUser(emailOrId: EmailOrId, pass: string): Promise<any> {
    const user = await this.usersService.getUser(emailOrId);
    if (user && (await comparePassword(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}

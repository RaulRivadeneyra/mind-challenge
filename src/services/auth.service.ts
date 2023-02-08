import { Injectable } from '@nestjs/common';
import { UserServiceV1 } from './user.service';
import { comparePassword } from '@/utils/security';

type EmailOrId = { email: string } | { _id: string };

@Injectable()
export class AuthService {
  constructor(private userService: UserServiceV1) {}

  async validateUser(emailOrId: EmailOrId, pass: string): Promise<any> {
    const user = await this.userService.findOne(emailOrId);
    if (user && (await comparePassword(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}

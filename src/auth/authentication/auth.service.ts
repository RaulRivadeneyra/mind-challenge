import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { comparePassword } from '../../utils/security';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDTO } from '../dtos/user-credentials.dto';
import { JwtPayloadDTO } from '../dtos/jwt-payload-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: UserCredentialsDTO): Promise<JwtPayloadDTO> {
    const { email, password } = credentials;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    console.log('user', user);

    return {
      _id: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  }

  async login(user: Express.User): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}

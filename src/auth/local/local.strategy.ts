import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtPayloadDTO } from '../dtos/jwt-payload-dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('LocalStrategy');
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<JwtPayloadDTO> {
    let payload: JwtPayloadDTO;
    try {
      payload = await this.authService.validateUser({ email, password });
    } catch (error) {
      console.error('error', error);
      throw new UnauthorizedException();
    }
    return payload;
  }
}

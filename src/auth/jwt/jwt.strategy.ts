import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const authConfig = configService.get('auth');
    if (!authConfig) {
      throw new Error('Auth config is not defined');
    }
    console.log('authConfig', authConfig);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<any> {
    return { email: payload.email, sub: payload.sub };
  }
}

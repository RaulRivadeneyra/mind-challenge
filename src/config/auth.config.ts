import { registerAs } from '@nestjs/config';
import { IsDefined, IsString } from 'class-validator';
import constants from './constants';

export class AuthConfig {
  @IsString()
  @IsDefined()
  SECRET?: string;
}

export default registerAs(
  constants.CONFIGS.AUTH,
  (): AuthConfig => ({
    SECRET: process.env.SECRET,
  }),
);

import { registerAs } from '@nestjs/config';
import { IsNumber, IsString } from 'class-validator';
import constants from './constants';
export class HTTPConfig {
  @IsString()
  HOST: string;
  @IsNumber()
  PORT: number;
}

export default registerAs(
  constants.CONFIGS.HTTP,
  (): HTTPConfig => ({
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  }),
);

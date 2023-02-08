import { registerAs } from '@nestjs/config';
import { IsNumber, IsString } from 'class-validator';

export class HTTPConfig {
  @IsString()
  HOST: string;
  @IsNumber()
  PORT: number;
}

export default registerAs(
  'http',
  (): HTTPConfig => ({
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  }),
);

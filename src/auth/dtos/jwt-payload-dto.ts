import { IsEmail, IsNotEmpty } from 'class-validator';
export class JwtPayloadDTO {
  @IsNotEmpty()
  _id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: string;
}

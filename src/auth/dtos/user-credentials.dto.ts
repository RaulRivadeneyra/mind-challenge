import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserCredentialsDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

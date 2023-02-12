import { IsEmail, IsNotEmpty, IsMongoId } from 'class-validator';
export class JwtPayloadDTO {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

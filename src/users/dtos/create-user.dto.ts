import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../schemas/user.schema';

export class CreateUserDTO {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: Role;
}

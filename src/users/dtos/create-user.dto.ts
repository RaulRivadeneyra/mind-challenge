import { Role } from '../schemas/role.sub-schema';

export class CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles?: Role[];
}

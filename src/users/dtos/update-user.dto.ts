import { Role } from '../schemas/role.sub-schema';

export class UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  roles?: Role[];
}

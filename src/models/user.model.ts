import { Role, PermissionDomain, PermissionAction } from './role.model';
import { UserDocument } from '@/schemas/user.schema';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];

  constructor(user: UserDocument) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }

  isAllowed(domain: PermissionDomain, action: PermissionAction): boolean {
    return this.roles.some((role) => role.hasPermission(domain, action));
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

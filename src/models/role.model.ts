export enum PermissionDomain {
  USER = 'user',
  ACCOUNT = 'account',
}

export enum PermissionAction {
  NO_ACCESS = 'no_access',
  READ = 'read',
  WRITE = 'write',
}

export class Permission {
  domain: PermissionDomain;
  action: PermissionAction;
}

export class Role {
  id: string;
  name: string;
  permissions: Permission[];

  hasPermission(domain: PermissionDomain, action: PermissionAction): boolean {
    return this.permissions.some(
      (permission) =>
        permission.domain === domain && permission.action === action,
    );
  }
}

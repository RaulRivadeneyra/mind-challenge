export enum PermissionAction {
  NO_ACCESS = 'no_access',
  READ = 'read',
  WRITE = 'write',
  ALL_ACCESS = 'all_access',
}

export enum PermissionEntity {
  USER = 'user',
  ACCOUNT = 'account',
}

export class Permission {
  action: PermissionAction;
  entity: PermissionEntity;
}

export class Role {
  name: string;
  permissions: Permission[];
}

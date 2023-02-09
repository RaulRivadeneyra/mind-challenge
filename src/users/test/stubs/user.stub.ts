import { User } from '../../schemas/user.schema';
import {
  PermissionAction,
  PermissionEntity,
} from '../../schemas/role.sub-schema';

export const userStub = (): User & { _id: string } => {
  return {
    _id: '12345',
    email: 'test@example.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'User',
    roles: [
      {
        name: 'admin',
        permissions: [
          {
            entity: PermissionEntity.USER,
            action: PermissionAction.ALL_ACCESS,
          },
        ],
      },
    ],
  };
};

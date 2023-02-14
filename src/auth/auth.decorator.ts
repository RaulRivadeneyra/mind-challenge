import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/users/schemas/user.schema';
import { Roles } from './authorization/roles/roles.decorator';
import { JwtAuthGuard } from './authentication/jwt/jwt-auth.guard';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from './authorization/roles/roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

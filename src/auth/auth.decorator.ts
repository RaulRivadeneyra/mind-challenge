import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/users/schemas/user.schema';
import { Roles } from './roles/roles.decorator';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from './roles/roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

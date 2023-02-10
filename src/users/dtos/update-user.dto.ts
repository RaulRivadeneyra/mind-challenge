import { Role } from '../schemas/role.sub-schema';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiPropertyOptional()
  firstName?: string;
  @ApiPropertyOptional()
  lastName?: string;
  @ApiPropertyOptional()
  email?: string;
  @ApiPropertyOptional()
  roles?: Role[];
}

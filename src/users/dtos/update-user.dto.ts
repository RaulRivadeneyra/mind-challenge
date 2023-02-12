import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../schemas/user.schema';

export class UpdateUserDTO {
  @ApiPropertyOptional()
  firstName?: string;
  @ApiPropertyOptional()
  lastName?: string;
  @ApiPropertyOptional()
  email?: string;
  @ApiPropertyOptional()
  role?: Role[];
}

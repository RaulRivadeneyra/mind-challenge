import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAccountDTO {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  clientName?: string;
  @ApiPropertyOptional()
  responsible?: string;
  @ApiPropertyOptional()
  team?: {
    userId?: string;
    startedAt?: Date;
    endedAt?: Date;
  }[];
}

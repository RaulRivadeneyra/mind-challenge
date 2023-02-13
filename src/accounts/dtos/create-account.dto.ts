import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  clientName: string;
  @ApiProperty()
  responsible: string;
  @ApiProperty()
  team: {
    userId: string;
    startedAt: Date;
    endedAt?: Date;
  }[];
}

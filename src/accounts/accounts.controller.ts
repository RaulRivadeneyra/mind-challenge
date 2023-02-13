import { CreateAccountDTO, UpdateAccountDTO } from './dtos';
import { Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AccountServiceV1 } from './accounts.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from 'src/users/schemas/user.schema';
import { Auth } from 'src/auth/auth.decorator';

@ApiTags('Accounts routes')
@Controller({
  path: 'accounts',
  version: '1',
})
@Auth(Role.SUPER, Role.ADMIN)
export class AccountsControllerV1 {
  constructor(private readonly service: AccountServiceV1) {}
  @Get(':id')
  async getAccount(@Param('id') id: string) {
    return this.service.getById(id);
  }
  @Get()
  async getAccounts() {
    return this.service.getAll();
  }

  @Post()
  async createAccounts(
    @Req() req: Request<unknown, unknown, CreateAccountDTO>,
  ) {
    return this.service.create(req.body);
  }

  @Put(':id')
  async updateAccounts(
    @Param('id') id: string,
    @Req() req: Request<unknown, unknown, UpdateAccountDTO>,
  ) {
    return this.service.update(id, req.body);
  }
}

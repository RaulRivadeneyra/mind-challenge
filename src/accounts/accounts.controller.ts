import { CreateAccountDTO, UpdateAccountDTO } from './dtos';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../users/schemas/user.schema';
import { Auth } from '../auth/auth.decorator';

@ApiTags('Accounts routes')
@Controller({
  path: 'accounts',
  version: '1',
})
@Auth(Role.SUPER, Role.ADMIN)
export class AccountsController {
  constructor(private readonly service: AccountsService) {}
  @Get(':id')
  async getAccount(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Get()
  async getAccounts() {
    return this.service.findAll();
  }

  @Post()
  async createAccount(@Body() user: CreateAccountDTO) {
    return this.service.create(user);
  }

  @Put(':id')
  async updateAccount(@Param('id') id: string, @Body() user: UpdateAccountDTO) {
    return this.service.update(id, user);
  }
}

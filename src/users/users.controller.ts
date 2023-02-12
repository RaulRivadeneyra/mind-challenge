import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { Req, Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { UsersServiceV1 } from './users.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users routes')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersControllerV1 {
  constructor(private readonly usersService: UsersServiceV1) {}
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }
}

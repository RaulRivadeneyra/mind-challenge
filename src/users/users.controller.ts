import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { Controller, Get, Param, Post, Put, Body, Req } from '@nestjs/common';
import { UsersServiceV1 } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

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
  async createUser(@Req() req: Request<unknown, unknown, CreateUserDTO>) {
    const user = req.body;

    return this.usersService.createUser(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Req() req: Request<unknown, unknown, UpdateUserDTO>,
  ) {
    const user = req.body;
    return this.usersService.updateUser(id, user);
  }
}

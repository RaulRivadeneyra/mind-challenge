import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { Req, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersServiceV1 } from './users.service';
import { Request } from 'express';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersControllerV1 {
  constructor(private readonly usersService: UsersServiceV1) {}
  @Get(':id')
  async getUser(@Param('id') _id: string) {
    return this.usersService.getUser({ _id });
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
    return this.usersService.updateUser({ _id: id }, user);
  }
}

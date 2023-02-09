import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersServiceV1 } from './users.service';

@Controller({
  path: 'user',
  version: '1',
})
export class UsersControllerV1 {
  constructor(private readonly usersService: UsersServiceV1) {}
  @Get(':id')
  getUser(@Param('id') _id: string) {
    return this.usersService.getUser({ _id });
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDTO) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.usersService.updateUser({ _id: id }, user);
  }
}

import { CreateUserDTO, UpdateUserDTO } from './dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Auth } from '../auth/auth.decorator';
import { Role } from './schemas/user.schema';
import { User } from '../auth/user.decorator';

@ApiTags('Users routes')
@Controller({
  path: 'users',
  version: '1',
})
@Auth(Role.SUPER, Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }

  @Post('')
  async createUser(@Body() user: CreateUserDTO, @User('role') role: Role) {
    if (role === Role.ADMIN && user.role === Role.ADMIN) {
      throw new UnauthorizedException('You cannot create an admin');
    }
    return this.usersService.create(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteOne(id);
  }

  @Delete('')
  async deleteUsers(@Body() ids: string[]) {
    return this.usersService.deleteMany(ids);
  }
}

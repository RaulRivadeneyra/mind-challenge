import { Role, User } from './schemas/user.schema';
import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersServiceV1 {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    console.log(user);
    return this.usersRepository.create(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ email: email });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ _id: id });
  }

  //TODO: Add pagination
  async getUsers(): Promise<User[] | null> {
    return this.usersRepository.find({});
  }

  async updateUser(id: string, user: UpdateUserDTO): Promise<User | null> {
    return this.usersRepository.findOneAndUpdate({ _id: id }, user);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.usersRepository.deleteOne({ _id: id });
  }

  async changeRole(id: string, role: Role): Promise<User | null> {
    return this.usersRepository.findOneAndUpdate({ _id: id }, { role });
  }
}

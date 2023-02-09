import { User } from './schemas/user.schema';
import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';

type EmailOrId = { email: string } | { _id: string };

@Injectable()
export class UsersServiceV1 {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    return this.usersRepository.create(user);
  }

  async getUser(emailOrId: EmailOrId): Promise<User | null> {
    return this.usersRepository.findOne(emailOrId);
  }

  //TODO: Add pagination
  async getUsers(): Promise<User[] | null> {
    return this.usersRepository.find({});
  }

  async updateUser(
    emailOrId: EmailOrId,
    user: UpdateUserDTO,
  ): Promise<User | null> {
    return this.usersRepository.findOneAndUpdate(emailOrId, user);
  }

  async deleteUser(emailOrId: EmailOrId): Promise<boolean> {
    return this.usersRepository.deleteOne(emailOrId);
  }
}

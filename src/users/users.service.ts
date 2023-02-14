import { Role, User } from './schemas/user.schema';
import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { BaseCRUDService } from 'src/common/base-crud.service';

export interface IUsersService
  extends BaseCRUDService<User, CreateUserDTO, UpdateUserDTO> {
  findByEmail(email: string): Promise<User | null>;
  changeRole(id: string, role: Role): Promise<User | null>;
}

@Injectable()
export class UsersService
  extends BaseCRUDService<User, CreateUserDTO, UpdateUserDTO>
  implements IUsersService
{
  constructor(protected readonly repository: UsersRepository) {
    super(repository);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email: email });
  }

  async changeRole(id: string, role: Role): Promise<User | null> {
    return this.repository.findOneAndUpdate({ _id: id }, { role });
  }
}

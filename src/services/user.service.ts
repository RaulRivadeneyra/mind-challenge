import { User, UserDocument } from '../schemas/user.schema';
import { createUserDTO } from '../dtos/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type EmailOrId = { email: string } | { _id: string };

@Injectable()
export class UserServiceV1 {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  /*
  async create(user: createUserDTO): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  */

  async findOne(emailOrId: EmailOrId): Promise<User | null> {
    const user = this.userModel.findOne(emailOrId).exec();
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}

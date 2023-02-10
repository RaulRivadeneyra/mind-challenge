import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersControllerV1 } from './users.controller';
import { UsersServiceV1 } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersControllerV1],
  providers: [UsersServiceV1, UsersRepository],
})
export class UsersModule {}

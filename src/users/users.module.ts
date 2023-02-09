import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersControllerV1 } from './users.controller';
import { UsersServiceV1 } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersControllerV1],
  providers: [UsersServiceV1],
})
export class UsersModule {}

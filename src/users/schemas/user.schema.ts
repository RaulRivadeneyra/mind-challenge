import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './role.sub-schema';
import middlewares from './user.middleware';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([Role])
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', middlewares.pre.save);

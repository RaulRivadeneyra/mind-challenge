import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from './role.schema';
import middlewares from './middlewares/user.middleware';

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

  @Prop({ type: [Types.ObjectId], required: true, ref: Role.name })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', middlewares.pre.save);

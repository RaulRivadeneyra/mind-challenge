import { SchemaTypes, Schema, HydratedDocument, Types } from 'mongoose';
import middlewares from './user.middleware';

export enum Role {
  SUPER = 'super',
  ADMIN = 'admin',
  NORMAL = 'normal',
}

export interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export const UserSchema = new Schema<User>({
  firstName: { type: SchemaTypes.String, required: true },
  lastName: { type: SchemaTypes.String, required: true },
  email: { type: SchemaTypes.String, required: true, unique: true },
  password: { type: SchemaTypes.String, required: true },
  role: { type: SchemaTypes.String, required: true, enum: Object.values(Role) },
});

export type UserDocument = User & HydratedDocument<User>;

UserSchema.pre('save', middlewares.pre.save);

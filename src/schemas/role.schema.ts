import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from '@/models/role.model';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Permission], required: true })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);

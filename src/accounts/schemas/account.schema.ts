import { SchemaTypes, Schema, HydratedDocument, Types } from 'mongoose';

export interface Account {
  _id: Types.ObjectId;
  name: string;
  clientName: string;
  responsible: Types.ObjectId;
  team: {
    userId: Types.ObjectId;
    startedAt: Date;
    endedAt?: Date;
  }[];
}

export const AccountSchema = new Schema<Account>({
  name: { type: SchemaTypes.String, required: true },
  clientName: { type: SchemaTypes.String, required: true },
  responsible: { type: SchemaTypes.ObjectId, required: true, ref: 'User' },
  team: [
    {
      userId: { type: SchemaTypes.ObjectId, required: true, ref: 'User' },
      startedAt: { type: SchemaTypes.Date, required: true },
      endedAt: { type: SchemaTypes.Date },
    },
  ],
});

export type AccountDocument = HydratedDocument<Account>;

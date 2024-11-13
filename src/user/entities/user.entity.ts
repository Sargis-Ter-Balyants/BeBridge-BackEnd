import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  EMPLOYEE = 'employee',
  EMPLOYER = 'employer',
  MODERATOR = 'moderator'
}

@Schema()
export class User {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  surname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: undefined })
  code: string;

  @Prop({ required: false, default: false })
  confirmed: boolean;

  @Prop({ required: false, default: 0 })
  rating: number;

  @Prop({ required: false, default: 'Empty' })
  address: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [ String ], required: true, enum: Role })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

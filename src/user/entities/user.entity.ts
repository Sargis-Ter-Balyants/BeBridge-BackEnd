import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Profile } from './profile.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';
import { Skill } from './skill.entity';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  EMPLOYEE = 'employee',
  EMPLOYER = 'employer',
  MODERATOR = 'moderator'
}

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: undefined })
  code: string;

  @Prop({ required: false, default: false })
  confirmed: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [ String ], required: true, enum: Role })
  roles: Role[];

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profile: Profile | Types.ObjectId;

  @Prop({ type: [ { type: Types.ObjectId, ref: 'Education' } ] })
  education: Types.ObjectId[];

  @Prop({ type: [ { type: Types.ObjectId, ref: 'Experience' } ] })
  experience: Types.ObjectId[];

  @Prop({ type: [ { type: Types.ObjectId, ref: 'Skill' } ] })
  skill: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

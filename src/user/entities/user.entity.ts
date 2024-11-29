import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Profile } from './profile.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';
import { Skill } from './skill.entity';
import { Jobs } from '../../jobs/entities/jobs.entity';

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

  @Prop({ type: Types.ObjectId, ref: Profile.name })
  profile: Types.ObjectId;

  @Prop({ type: [ { type: Types.ObjectId, ref: Education.name } ] })
  education: Types.ObjectId[];

  @Prop({ type: [ { type: Types.ObjectId, ref: Experience.name } ] })
  experience: Types.ObjectId[];

  @Prop({ type: [ { type: Types.ObjectId, ref: Skill.name } ] })
  skill: Types.ObjectId[];

  @Prop({ type: [ { type: Types.ObjectId, ref: Jobs.name } ] })
  bookmark: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

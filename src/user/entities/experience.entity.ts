import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';

export type ExperienceDocument = HydratedDocument<Experience>;

@Schema({ versionKey: false })
export class Experience {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User | Types.ObjectId;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);

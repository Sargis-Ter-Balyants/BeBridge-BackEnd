import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';

@Schema({ versionKey: false })
export class Education {
  @Prop({ required: true })
  institution: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User | Types.ObjectId;
}

export const EducationSchema = SchemaFactory.createForClass(Education);

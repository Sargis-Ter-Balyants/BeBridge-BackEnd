import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/entities/user.entity';
import { Answer, AnswerSchema } from './answer.entity';
import { Jobs } from '../../jobs/entities/jobs.entity';

export enum AnswerType {
  RADIO = 'radio',
  SELECT = 'select'
}

@Schema({ timestamps: true, versionKey: false })
export class Test {
  @Prop({ required: true })
  question: string;

  @Prop({ type: [ AnswerSchema ], required: true })
  answers: Answer[];

  @Prop({ type: String, required: true, enum: AnswerType, default: AnswerType.RADIO })
  answersType: AnswerType;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: [ String ], required: true })
  tags: string[];

  @Prop({ default: false })
  published: boolean;

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  updatedBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Jobs.name })
  job: Types.ObjectId;
}

export const TestSchema = SchemaFactory.createForClass(Test);

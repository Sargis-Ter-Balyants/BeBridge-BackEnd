import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';

@Schema({ versionKey: false })
export class Skill {
  @Prop({ required: true })
  skillName: string;

  @Prop({ required: true, min: 0, max: 100 })
  frontier: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User | Types.ObjectId;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

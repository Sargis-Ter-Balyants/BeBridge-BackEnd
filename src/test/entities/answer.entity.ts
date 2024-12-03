import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Answer {
  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: Boolean, required: true, default: false })
  correct: boolean;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: Number, required: true, min: 1 })
  order?: number;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

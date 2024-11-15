import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type JobCategoryDocument = HydratedDocument<JobCategory>;

@Schema()
export class JobCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  popularity: number;

  @Prop({ default: 0 })
  availableJobs: number;
}

export const JobCategorySchema = SchemaFactory.createForClass(JobCategory);

JobCategorySchema.plugin(mongoosePaginate);

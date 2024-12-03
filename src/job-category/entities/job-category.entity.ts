import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { Document, PaginateModel } from "mongoose";

@Schema({ collection: "job-categories", timestamps: true })
export class JobCategory {
    @Prop({ required: true })
    name: string;

    @Prop({ default: 0 })
    popularity: number;

    @Prop({ default: 0 })
    availableJobs: number;
}

export type JobCategoryDocument = JobCategory & Document;
export const JobCategorySchema = SchemaFactory.createForClass(JobCategory);

JobCategorySchema.plugin(mongoosePaginate);

export type JobCategoryPaginateModel = PaginateModel<JobCategoryDocument>;

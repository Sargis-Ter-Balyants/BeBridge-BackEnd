import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

export type JobCategoriesDocument = HydratedDocument<JobCategoriesModel>;

@Schema({ collection: "job-categories" })
export class JobCategoriesModel {
    @Prop()
    name: string;

    @Prop({ default: 0 })
    popularity: number;

    @Prop({ default: 0 })
    availableJobs: number;
}

export const JobCategoriesSchema = SchemaFactory.createForClass(JobCategoriesModel);

JobCategoriesSchema.plugin(mongoosePaginate);

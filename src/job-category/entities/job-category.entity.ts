import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");


@Schema({ collection: "job-categories", timestamps: true })
export class JobCategory {
    @Prop({ required: true })
    name: string;

    @Prop({ default: 0 })
    popularity: number;

    @Prop({ default: 0 })
    availableJobs: number;
}

export const JobCategorySchema = SchemaFactory.createForClass(JobCategory);

JobCategorySchema.plugin(mongoosePaginate as any);

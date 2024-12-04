import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

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

JobCategorySchema.plugin(mongoosePagination);

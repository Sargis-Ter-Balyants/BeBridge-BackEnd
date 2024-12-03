import { Types, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

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

(JobCategorySchema as MongooseSchema<any>).plugin(mongoosePaginate);

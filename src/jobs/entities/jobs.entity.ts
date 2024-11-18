import { HydratedDocument, ObjectId, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { JobCategory } from "src/job-category/entities/job-category.entity";

export type JobsDocument = HydratedDocument<JobsModel>;

@Schema({ collection: "jobs", timestamps: true })
export class JobsModel {
    @Prop({ required: true })
    positionName: string;

    @Prop({ required: true })
    companyName: string;

    @Prop({ required: true })
    positionDeadline: Date;

    @Prop({ type: Types.ObjectId, ref: JobCategory.name, required: true })
    category: Types.ObjectId;

    @Prop({ required: true })
    price: number[];

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    level: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    image: string;
}

export const JobsSchema = SchemaFactory.createForClass(JobsModel);

JobsSchema.plugin(mongoosePaginate);

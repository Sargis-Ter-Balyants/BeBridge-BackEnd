import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");


@Schema({ collection: "reports", timestamps: true })
export class ReportsModel {
    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    position: string;

    @Prop({ required: true })
    totalQuestions: number;

    @Prop({ required: true })
    status: 0 | 1 | 2;
}

export const ReportsSchema = SchemaFactory.createForClass(ReportsModel);

ReportsSchema.plugin(mongoosePaginate as any);

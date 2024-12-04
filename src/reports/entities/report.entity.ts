import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

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

ReportsSchema.plugin(mongoosePagination);

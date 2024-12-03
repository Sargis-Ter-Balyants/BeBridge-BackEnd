import { Types, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

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

(ReportsSchema as MongooseSchema<any>).plugin(mongoosePaginate);

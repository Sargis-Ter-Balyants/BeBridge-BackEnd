import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");


@Schema({ collection: "news", timestamps: true })
export class NewsModel {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    type: string;
}

export const NewsSchema = SchemaFactory.createForClass(NewsModel);

NewsSchema.plugin(mongoosePaginate as any);

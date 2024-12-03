import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { Document, PaginateModel } from "mongoose";

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

export type NewsDocument = NewsModel & Document;
export const NewsSchema = SchemaFactory.createForClass(NewsModel);

NewsSchema.plugin(mongoosePaginate);

export type NewsPaginateModel = PaginateModel<NewsDocument>;

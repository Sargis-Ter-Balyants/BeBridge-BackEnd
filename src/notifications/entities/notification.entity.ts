import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

export type NotificationsDocument = HydratedDocument<NotificationsModel>;

@Schema({ collection: "notifications", timestamps: true })
export class NotificationsModel {
    @Prop({ required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    isRead: boolean;

    @Prop({ required: true })
    status: 0 | 1 | 2 | 3;
}

export const NotificationsSchema = SchemaFactory.createForClass(NotificationsModel);

NotificationsSchema.plugin(mongoosePaginate);

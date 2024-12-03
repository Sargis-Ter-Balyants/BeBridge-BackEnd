import { Types, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

@Schema({ collection: "contact-us", timestamps: true })
export class ContactUsModel {
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    message: string;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUsModel);

(ContactUsSchema as MongooseSchema<any>).plugin(mongoosePaginate);

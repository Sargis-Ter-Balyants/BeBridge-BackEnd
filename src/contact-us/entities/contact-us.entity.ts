import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { Document, PaginateModel } from "mongoose";

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

export type ContactUsDocument = ContactUsModel & Document;
export const ContactUsSchema = SchemaFactory.createForClass(ContactUsModel);

ContactUsSchema.plugin(mongoosePaginate);

export type ContactUsPaginateModel = PaginateModel<ContactUsDocument>;

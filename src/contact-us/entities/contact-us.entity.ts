import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

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

ContactUsSchema.plugin(mongoosePagination);

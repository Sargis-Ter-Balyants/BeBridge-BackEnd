import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ContactUsDto } from "./dto/contact-us.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ContactUsModel } from "./entities/contact-us.entity";
import { PaginateModel, Types } from "mongoose";

@Injectable()
export class ContactUsService {
    constructor(
        @InjectModel(ContactUsModel.name)
        private readonly contactUsModel: PaginateModel<ContactUsModel>
    ) {}

    create(body: ContactUsDto) {
        return this.contactUsModel.create(body);
    }

    findAll() {
        return this.contactUsModel.find();
    }

    findOne(id: Types.ObjectId) {
        return this.contactUsModel.findById(id);
    }

    async update(id: Types.ObjectId, body: ContactUsDto) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const updatedContactUs = await this.contactUsModel.findByIdAndUpdate(id, { ...body }, { new: true });
        if (!updatedContactUs) throw new NotFoundException(`Contact request not found`);

        return updatedContactUs;
    }

    async delete(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const contactRequest = await this.contactUsModel.findByIdAndDelete({ _id: id });
        if (!contactRequest) throw new NotFoundException(`Contact request not found`);

        return contactRequest;
    }
}

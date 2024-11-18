import { Injectable, NotFoundException } from "@nestjs/common";
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

    getAll(page: number = 1, limit: number = 10) {
        const query = {};

        const options = {
            page,
            limit,
        };

        return this.contactUsModel.paginate(query, options);
    }

    // This is going to be different based on our needs
    search(page: number = 1, limit: number = 10) {
        const query = {};

        const options = {
            page,
            limit,
        };

        return this.contactUsModel.paginate(query, options);
    }

    findOne(id: Types.ObjectId) {
        const contactRequest = this.contactUsModel.findById(id);

        if (!contactRequest) throw new NotFoundException(`Contact request not found`);

        return contactRequest;
    }

    create(body: ContactUsDto) {
        return this.contactUsModel.create(body);
    }

    update(id: Types.ObjectId, body: ContactUsDto) {
        const updatedContactUs = this.contactUsModel.findByIdAndUpdate(id, { ...body }, { new: true });

        if (!updatedContactUs) throw new NotFoundException(`Contact request not found`);

        return updatedContactUs;
    }

    delete(id: Types.ObjectId) {
        const contactRequest = this.contactUsModel.findByIdAndDelete({ _id: id });

        if (!contactRequest) throw new NotFoundException(`Contact request not found`);

        return contactRequest;
    }
}

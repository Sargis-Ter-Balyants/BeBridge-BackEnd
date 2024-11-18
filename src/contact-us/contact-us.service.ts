import { Injectable } from "@nestjs/common";
import { ContactUsDto } from "./dto/contact-us.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ContactUsModel } from "./entities/contact-us.entity";
import { PaginateModel } from "mongoose";

@Injectable()
export class ContactUsService {
    constructor(
        @InjectModel(ContactUsModel.name)
        private readonly jobModel: PaginateModel<ContactUsModel>
    ) {}

    create(body: ContactUsDto) {
        return "This action adds a new contactUs";
    }

    findAll() {
        return `This action returns all contactUs`;
    }

    findOne(id: number) {
        return `This action returns a #${id} contactUs`;
    }

    update(id: number, body: ContactUsDto) {
        return `This action updates a #${id} contactUs`;
    }

    remove(id: number) {
        return `This action removes a #${id} contactUs`;
    }
}

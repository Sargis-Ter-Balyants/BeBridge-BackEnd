import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ContactUsService } from "./contact-us.service";
import { ContactUsDto } from "./dto/contact-us.dto";

@Controller("contact-us")
export class ContactUsController {
    constructor(private readonly contactUsService: ContactUsService) {}

    @Get()
    findAll() {
        return this.contactUsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.contactUsService.findOne(+id);
    }

    @Post()
    create(@Body() body: ContactUsDto) {
        return this.contactUsService.create(body);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() body: ContactUsDto) {
        return this.contactUsService.update(+id, body);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.contactUsService.remove(+id);
    }
}

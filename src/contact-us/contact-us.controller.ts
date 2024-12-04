import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { ContactUsService } from "./contact-us.service";
import { ContactUsDto } from "./dto/contact-us.dto";
import { Types } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/role.guard";
import { Roles } from "src/auth/role.decorator";
import { Role } from "src/user/entities/user.entity";


@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.MODERATOR)
@Controller("contact-us")
export class ContactUsController {
    constructor(private readonly contactUsService: ContactUsService) {}

    @Get("")
    getAll(@Query("page") page: string, @Query("limit") limit: string) {
        return this.contactUsService.getAll(parseInt(page), parseInt(limit));
    }

    @Get("search")
    search(@Query("page") page: string, @Query("limit") limit: string) {
        return this.contactUsService.search(parseInt(page), parseInt(limit));
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.contactUsService.findOne(new Types.ObjectId(id));
    }

    @UseGuards()
    @Post()
    create(@Body() body: ContactUsDto) {
        return this.contactUsService.create(body);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() body: ContactUsDto) {
        return this.contactUsService.update(new Types.ObjectId(id), body);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.contactUsService.delete(new Types.ObjectId(id));
    }
}

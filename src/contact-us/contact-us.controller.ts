import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { ContactUsService } from "./contact-us.service";
import { ContactUsDto } from "./dto/contact-us.dto";
import { Types } from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/role.guard";
import { Roles } from "src/auth/role.decorator";
import { Role } from "src/user/entities/user.entity";
import { ParseNumber } from "src/utils/pipes/parseNumber.pipe";
import { ParseObjectId } from "src/utils/pipes/parseObjectId.pipe";

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.MODERATOR)
@Controller("contact-us")
export class ContactUsController {
    constructor(private readonly contactUsService: ContactUsService) {}

    @Get("")
    getAll(@Query("page", ParseNumber) page: number, @Query("limit", ParseNumber) limit: number) {
        return this.contactUsService.getAll(page, limit);
    }

    @Get("search")
    search(@Query("page", ParseNumber) page: number, @Query("limit", ParseNumber) limit: number) {
        return this.contactUsService.search(page, limit);
    }

    @Get(":id")
    findOne(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.contactUsService.findOne(id);
    }

    @UseGuards()
    @Post()
    create(@Body() body: ContactUsDto) {
        return this.contactUsService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseObjectId) id: Types.ObjectId, @Body() body: ContactUsDto) {
        return this.contactUsService.update(id, body);
    }

    @Delete(":id")
    remove(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.contactUsService.delete(id);
    }
}

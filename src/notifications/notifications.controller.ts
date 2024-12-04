import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsDTO } from "./dto/notifications.dto";
import { Types } from "mongoose";
import { ParseNumber } from "src/pipes/parseNumber.pipe";
import { ParseObjectId } from "src/pipes/parseObjectId.pipe";

@Controller("notifications")
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Get()
    getAll(@Query("page", ParseNumber) page: number, @Query("limit", ParseNumber) limit: number) {
        return this.notificationsService.getAll(page, limit);
    }

    @Get(":id")
    getOne(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.notificationsService.getOne(id);
    }

    @Post()
    create(@Body() body: NotificationsDTO) {
        return this.notificationsService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseObjectId) id: Types.ObjectId, @Body() body: NotificationsDTO) {
        return this.notificationsService.update(id, body);
    }

    @Delete(":id")
    delete(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.notificationsService.delete(id);
    }
}

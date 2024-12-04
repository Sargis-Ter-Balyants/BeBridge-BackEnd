import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsDTO } from "./dto/notifications.dto";
import { Types } from "mongoose";


@Controller("notifications")
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Get()
    getAll(@Query("page") page: string, @Query("limit") limit: string) {
        return this.notificationsService.getAll(parseInt(page), parseInt(limit));
    }

    @Get(":id")
    getOne(@Param("id") id: string) {
        return this.notificationsService.getOne(new Types.ObjectId(id));
    }

    @Post()
    create(@Body() body: NotificationsDTO) {
        return this.notificationsService.create(body);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() body: NotificationsDTO) {
        return this.notificationsService.update(new Types.ObjectId(id), body);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.notificationsService.delete(new Types.ObjectId(id));
    }
}

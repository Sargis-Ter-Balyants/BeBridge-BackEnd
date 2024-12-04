import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsDTO } from "./dto/reports.dto";
import { Types } from "mongoose";

import { ParseObjectId } from "src/utils/pipes/parseObjectId.pipe";

@Controller("reports")
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Get()
    getAll(@Query("page", ParseIntPipe) page: number, @Query("limit", ParseIntPipe) limit: number) {
        return this.reportsService.getAll(page, limit);
    }

    @Get(":id")
    getOne(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.reportsService.getOne(id);
    }

    @Post()
    create(@Body() body: ReportsDTO) {
        return this.reportsService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseObjectId) id: Types.ObjectId, @Body() body: ReportsDTO) {
        return this.reportsService.update(id, body);
    }

    @Delete(":id")
    delete(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.reportsService.delete(id);
    }
}

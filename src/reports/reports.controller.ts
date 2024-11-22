import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsDTO } from "./dto/reports.dto";
import { ParsePageAndLimitPipe } from "pipes/pageAndLimit.pipe";
import { ParseObjectIdPipe } from "pipes/objectIdPipe.pipe";
import { Types } from "mongoose";

@Controller("reports")
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Get()
    getAll(@Query("page", ParsePageAndLimitPipe) page: number, @Query("limit", ParsePageAndLimitPipe) limit: number) {
        return this.reportsService.getAll(page, limit);
    }

    @Get(":id")
    getOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.reportsService.getOne(id);
    }

    @Post()
    create(@Body() body: ReportsDTO) {
        return this.reportsService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() body: ReportsDTO) {
        return this.reportsService.update(id, body);
    }

    @Delete(":id")
    delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.reportsService.delete(id);
    }
}

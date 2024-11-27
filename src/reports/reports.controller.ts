import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsDTO } from "./dto/reports.dto";
import { IsPaginate } from "src/utils/paginate.pipe";
import { IsObjectId } from "src/utils/object-id.pipe";
import { Types } from "mongoose";

@Controller("reports")
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Get()
    getAll(@Query("page", IsPaginate) page: number, @Query("limit", IsPaginate) limit: number) {
        return this.reportsService.getAll(page, limit);
    }

    @Get(":id")
    getOne(@Param("id", IsObjectId) id: Types.ObjectId) {
        return this.reportsService.getOne(id);
    }

    @Post()
    create(@Body() body: ReportsDTO) {
        return this.reportsService.create(body);
    }

    @Patch(":id")
    update(@Param("id", IsObjectId) id: Types.ObjectId, @Body() body: ReportsDTO) {
        return this.reportsService.update(id, body);
    }

    @Delete(":id")
    delete(@Param("id", IsObjectId) id: Types.ObjectId) {
        return this.reportsService.delete(id);
    }
}

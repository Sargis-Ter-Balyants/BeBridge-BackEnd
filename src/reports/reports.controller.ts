import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsDTO } from "./dto/reports.dto";
import { Types } from "mongoose";


@Controller("reports")
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Get()
    getAll(@Query("page") page: string, @Query("limit") limit: string) {
        return this.reportsService.getAll(parseInt(page), parseInt(limit));
    }

    @Get(":id")
    getOne(@Param("id") id: string) {
        return this.reportsService.getOne(new Types.ObjectId(id));
    }

    @Post()
    create(@Body() body: ReportsDTO) {
        return this.reportsService.create(body);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() body: ReportsDTO) {
        return this.reportsService.update(new Types.ObjectId(id), body);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.reportsService.delete(new Types.ObjectId(id));
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JobSDto } from "./dto/jobs.dto";
import { JobsService } from "./jobs.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("jobs")
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    async getAll(@Query("page") page: number, @Query("limit") limit: number) {
        return this.jobsService.getAll(page, limit);
    }

    @UseGuards(AuthGuard)
    @Get("search")
    async search(@Query("limit") limit: number) {
        return this.jobsService.search();
    }

    @Get(":id")
    async findOne(@Param("id") id: Types.ObjectId) {
        return this.jobsService.getOne(id);
    }

    @Post()
    async create(@Body() body: JobSDto) {
        return this.jobsService.create(body);
    }

    @Patch(":id")
    async update(@Param("id") id: Types.ObjectId, @Body() body: JobSDto) {
        return this.jobsService.update(id, body);
    }

    @Delete(":id")
    async delete(@Param("id") id: Types.ObjectId) {
        return this.jobsService.delete(id);
    }
}

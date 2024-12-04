import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { Types } from "mongoose";
import { JobCategoryDto } from "./dto/job-category.dto";
import { JobCategoryService } from "./job-category.service";

import { ParseObjectId } from "src/utils/pipes/parseObjectId.pipe";

@Controller("job-category")
export class JobCategoryController {
    constructor(private readonly jobCategoryService: JobCategoryService) {}

    @Get()
    async getAll(@Query("page", ParseIntPipe) page: number, @Query("limit", ParseIntPipe) limit: number) {
        return this.jobCategoryService.getAll(page, limit);
    }

    @Get()
    async search(@Query("page", ParseIntPipe) page: number, @Query("limit", ParseIntPipe) limit: number) {
        return this.jobCategoryService.search(page, limit);
    }

    @Get("popular")
    async getMostPopular(@Query("limit", ParseIntPipe) limit: number) {
        return this.jobCategoryService.getMostPopular(limit);
    }

    @Get(":id")
    async findOne(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.jobCategoryService.getOne(id);
    }

    @Post()
    async create(@Body() jobCategory: JobCategoryDto) {
        return this.jobCategoryService.create(jobCategory.name);
    }

    @Patch(":id")
    async update(@Param("id", ParseObjectId) id: Types.ObjectId, @Body() jobCategory: JobCategoryDto) {
        return this.jobCategoryService.update(id, jobCategory);
    }

    @Delete(":id")
    async delete(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.jobCategoryService.delete(id);
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Types } from "mongoose";
import { JobCategoryDto } from "./dto/job-category.dto";
import { JobCategoryService } from "./job-category.service";
import { ParseObjectIdPipe } from "pipes/objectIdPipe.pipe";
import { ParsePageAndLimitPipe } from "pipes/pageAndLimit.pipe";

@Controller("job-category")
export class JobCategoryController {
    constructor(private readonly jobCategoryService: JobCategoryService) {}

    @Get()
    async getAll(
        @Query("page", ParsePageAndLimitPipe) page: number,
        @Query("limit", ParsePageAndLimitPipe) limit: number
    ) {
        return this.jobCategoryService.getAll(page, limit);
    }

    @Get("popular")
    async getMostPopular(@Query("limit", ParsePageAndLimitPipe) limit: number) {
        return this.jobCategoryService.getMostPopular(limit);
    }

    @Get(":id")
    async findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.jobCategoryService.getOne(id);
    }

    @Post()
    async create(@Body() jobCategory: JobCategoryDto) {
        return this.jobCategoryService.create(jobCategory.name);
    }

    @Patch(":id")
    async update(@Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() jobCategory: JobCategoryDto) {
        return this.jobCategoryService.update(id, jobCategory);
    }

    @Delete(":id")
    async delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.jobCategoryService.delete(id);
    }
}

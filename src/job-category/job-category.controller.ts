import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Types } from "mongoose";
import { JobCategoryDto } from "./dto/job-category.dto";
import { JobCategoryService } from "./job-category.service";

@Controller("job-category")
export class JobCategoryController {
    constructor(private readonly jobCategoryService: JobCategoryService) {}

    @Get()
    async getAll(@Query("page") page: string, @Query("limit") limit: string) {
        return this.jobCategoryService.getAll(parseInt(page), parseInt(limit));
    }

    @Get()
    async search(@Query("page") page: string, @Query("limit") limit: string) {
        return this.jobCategoryService.search(parseInt(page), parseInt(limit));
    }

    @Get("popular")
    async getMostPopular(@Query("limit") limit: string) {
        return this.jobCategoryService.getMostPopular(parseInt(limit));
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.jobCategoryService.getOne(new Types.ObjectId(id));
    }

    @Post()
    async create(@Body() jobCategory: JobCategoryDto) {
        return this.jobCategoryService.create(jobCategory.name);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() jobCategory: JobCategoryDto) {
        return this.jobCategoryService.update(new Types.ObjectId(id), jobCategory);
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.jobCategoryService.delete(new Types.ObjectId(id));
    }
}

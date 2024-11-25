import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Types } from "mongoose";
import { JobCategoryDto } from "./dto/job-category.dto";
import { JobCategoryService } from "./job-category.service";
import { IsObjectId } from "src/utils/object-id.pipe";
import { IsPaginate } from "src/utils/paginate.pipe";

@Controller("job-category")
export class JobCategoryController {
    constructor(private readonly jobCategoryService: JobCategoryService) {}

    @Get()
    async getAll(
        @Query("page", IsPaginate) page: number,
        @Query("limit", IsPaginate) limit: number
    ) {
        return this.jobCategoryService.getAll(page, limit);
    }

    @Get()
    async search(
        @Query("page", IsPaginate) page: number,
        @Query("limit", IsPaginate) limit: number
    ) {
        return this.jobCategoryService.search(page, limit);
    }

    @Get("popular")
    async getMostPopular(@Query("limit", IsPaginate) limit: number) {
        return this.jobCategoryService.getMostPopular(limit);
    }

    @Get(":id")
    async findOne(@Param("id", IsObjectId) id: Types.ObjectId) {
        return this.jobCategoryService.getOne(id);
    }

    @Post()
    async create(@Body() jobCategory: JobCategoryDto) {
        return this.jobCategoryService.create(jobCategory.name);
    }

    @Patch(":id")
    async update(@Param("id", IsObjectId) id: Types.ObjectId, @Body() jobCategory: JobCategoryDto) {
        return this.jobCategoryService.update(id, jobCategory);
    }

    @Delete(":id")
    async delete(@Param("id", IsObjectId) id: Types.ObjectId) {
        return this.jobCategoryService.delete(id);
    }
}

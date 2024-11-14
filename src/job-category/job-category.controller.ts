import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JobCategoriesService } from "./job-category.service";
import { JobCategoriesDto } from "./dto/job-category.dto";

@Controller("job-categories")
export class JobCategoriesController {
    constructor(private readonly jobCategoriesService: JobCategoriesService) {}

    @Get("")
    async getAll(@Query("page") page: number, @Query("limit") limit: number): Promise<SuccessResponse> {
        return await this.jobCategoriesService.getAll(page || 1, limit || 6);
    }

    @Get("popular")
    async getMostPopular(): Promise<SuccessResponse> {
        return await this.jobCategoriesService.getMostPopular(6);
    }

    @Get(":id")
    async findOne(@Param("id") id: Types.ObjectId): Promise<SuccessResponse> {
        return await this.jobCategoriesService.getOne(id);
    }

    @Post("")
    async create(@Body() body: JobCategoriesDto): Promise<SuccessResponse> {
        return await this.jobCategoriesService.create(body);
    }

    @Patch(":id")
    async update(@Param("id") id: Types.ObjectId, @Body() body: JobCategoriesDto): Promise<SuccessResponse> {
        return await this.jobCategoriesService.update(id, body);
    }

    @Delete(":id")
    async delete(@Param("id") id: Types.ObjectId): Promise<SuccessResponse> {
        return await this.jobCategoriesService.delete(id);
    }
}

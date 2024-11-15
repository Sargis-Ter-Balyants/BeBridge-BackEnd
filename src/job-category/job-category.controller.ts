import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { JobCategoryDto } from './dto/job-category.dto';
import { JobCategoryService } from './job-category.service';

@Controller('job-category')
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Get()
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.jobCategoryService.getAll(page, limit);
  }

  @Get('popular')
  async getMostPopular(@Query('limit') limit: number) {
    return this.jobCategoryService.getMostPopular(limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) {
    return this.jobCategoryService.getOne(id);
  }

  @Post()
  async create(@Body() jobCategory: JobCategoryDto) {
    return this.jobCategoryService.create(jobCategory.name);
  }

  @Patch(':id')
  async update(@Param('id') id: Types.ObjectId, @Body() jobCategory: JobCategoryDto) {
    return this.jobCategoryService.update(id, jobCategory);
  }

  @Delete(':id')
  async delete(@Param('id') id: Types.ObjectId) {
    return this.jobCategoryService.delete(id);
  }
}

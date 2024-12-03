import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, Types } from "mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JobCategory, JobCategoryPaginateModel } from "./entities/job-category.entity";
import { JobCategoryDto } from "./dto/job-category.dto";

@Injectable()
export class JobCategoryService {
    constructor(
        @InjectModel(JobCategory.name)
        private readonly jobCategoryModel: JobCategoryPaginateModel
    ) {}

    async getMostPopular(limit: number = 6) {
        return this.jobCategoryModel.find().sort({ popularity: -1 }).limit(limit);
    }

    async getAll(page: number = 1, limit: number = 10) {
        const query = {};

        const options = {
            page,
            limit,
        };

        return this.jobCategoryModel.paginate(query, options);
    }

    // This is going to be different based on our needs
    async search(page: number = 1, limit: number = 10) {
        const query = {};

        const options = {
            page,
            limit,
        };

        return this.jobCategoryModel.paginate(query, options);
    }

    async getOne(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const jobCategory = await this.jobCategoryModel.findById(id);
        if (!jobCategory) throw new NotFoundException(`Job category not found`);

        return jobCategory;
    }

    async create(name: string) {
        return this.jobCategoryModel.create({ name, popularity: 0, availableJobs: 0 });
    }

    async update(id: Types.ObjectId, jobCategory: JobCategoryDto) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const updatedJobCategory = await this.jobCategoryModel.findByIdAndUpdate(id, { ...jobCategory }, { new: true });
        if (!updatedJobCategory) throw new NotFoundException(`Job category not found`);

        return updatedJobCategory;
    }

    async delete(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const jobCategory = await this.jobCategoryModel.findByIdAndDelete({ _id: id });
        if (!jobCategory) throw new NotFoundException(`Job category not found`);

        return jobCategory;
    }
}

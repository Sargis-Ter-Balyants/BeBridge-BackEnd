import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, Types } from "mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JobCategory } from "./entities/job-category.entity";
import { JobCategoryDto } from "./dto/job-category.dto";

@Injectable()
export class JobCategoryService {
    constructor(
        @InjectModel(JobCategory.name)
        private readonly jobCategoryModel: PaginateModel<JobCategory>
    ) {}

    async getMostPopular(limit: number = 6) {
        return this.jobCategoryModel.find().sort({ popularity: -1 }).limit(limit);
    }

    async getAll(page: number = 1, limit: number = 10) {
        const query = {};

        const options = {
            page,
            limit,
            query
        };

        return this.jobCategoryModel.paginate(options);
    }

    // This is going to be different based on our needs
    async search(page: number = 1, limit: number = 10) {
        const query = {};

        const options = {
            page,
            limit,
            query
        };

        return this.jobCategoryModel.paginate(options);
    }

    async getOne(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(new Types.ObjectId(id))) throw new BadRequestException(`Incorrect query`);

        const jobCategory = await this.jobCategoryModel.findById(new Types.ObjectId(id));
        if (!jobCategory) throw new NotFoundException(`Job category not found`);

        return jobCategory;
    }

    async create(name: string) {
        return this.jobCategoryModel.create({ name, popularity: 0, availableJobs: 0 });
    }

    async update(id: Types.ObjectId, jobCategory: JobCategoryDto) {
        if (!Types.ObjectId.isValid(new Types.ObjectId(id))) throw new BadRequestException(`Incorrect query`);

        const updatedJobCategory = await this.jobCategoryModel.findByIdAndUpdate(
            new Types.ObjectId(id),
            { ...jobCategory },
            { new: true }
        );
        if (!updatedJobCategory) throw new NotFoundException(`Job category not found`);

        return updatedJobCategory;
    }

    async delete(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(new Types.ObjectId(id))) throw new BadRequestException(`Incorrect query`);

        const jobCategory = await this.jobCategoryModel.findByIdAndDelete({ _id: id });
        if (!jobCategory) throw new NotFoundException(`Job category not found`);

        return jobCategory;
    }
}

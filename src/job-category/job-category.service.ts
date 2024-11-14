import { Model, PaginateModel, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import Success from "src/utils/SuccessResponse";
import { JobCategoriesModel } from "./job-category.model";
import { JobCategoriesDto } from "./dto/job-category.dto";

@Injectable()
export class JobCategoriesService {
    constructor(
        @InjectModel(JobCategoriesModel.name)
        private readonly jobCategoriesModel: PaginateModel<JobCategoriesModel>
    ) {}

    async getMostPopular(limit: number): Promise<SuccessResponse> {
        const result = await this.jobCategoriesModel.find().sort({ popularity: -1 }).limit(limit).exec();

        return Success(true, result, "Successful");
    }

    async getAll(page: number, limit: number): Promise<SuccessResponse> {
        const options = {
            page,
            limit,
        };

        const result = await this.jobCategoriesModel.paginate({}, options);

        return Success(true, result, "Successful");
    }

    async getOne(id: Types.ObjectId): Promise<SuccessResponse> {
        const result = await this.jobCategoriesModel.findById(id);

        if (!result) {
            return Success(false, null, "Job Category not found");
        }

        return Success(true, result, "Successful");
    }

    async create(body: JobCategoriesDto): Promise<SuccessResponse> {
        const { name } = body;

        const result = await this.jobCategoriesModel.create({
            name,
            popularity: 0,
            availableJobs: 0,
        });

        if (!result) {
            return Success(false, null, "Something went wrong");
        }

        return Success(true, result, "Successfully created");
    }

    async update(id: Types.ObjectId, body: JobCategoriesDto): Promise<SuccessResponse> {
        const result = await this.jobCategoriesModel.findByIdAndUpdate(id, body, { new: true }).exec();

        if (!result) {
            return Success(false, null, "Job category not found");
        }

        return Success(true, result, "Successfully updated");
    }

    async remove(id: Types.ObjectId): Promise<SuccessResponse> {
        const jobCategory = await this.jobCategoriesModel.findOneAndDelete({ id });

        if (!jobCategory) {
            return Success(false, null, "Job category not found");
        }

        return Success(true, null, "Successfully deleted");
    }

    async delete(id: Types.ObjectId): Promise<SuccessResponse> {
        try {
            await this.jobCategoriesModel.findByIdAndDelete(id).exec();
            return Success(true, "Successfully deleted", null);
        } catch (err) {
            return Success(false, err.message, null);
        }
    }
}

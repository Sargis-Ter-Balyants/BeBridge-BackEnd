import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, Types } from "mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JobsModel } from "./entities/jobs.entity";
import { JobSDto } from "./dto/jobs.dto";

@Injectable()
export class JobsService {
    constructor(
        @InjectModel(JobsModel.name)
        private readonly jobModel: PaginateModel<JobsModel>
    ) {}

    async getAll(page: number = 1, limit: number = 6) {
        return this.jobModel.paginate({}, { page, limit });
    }

    async search() {
        return this.jobModel.find();
    }

    async getOne(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const job = await this.jobModel.findById(id);
        if (!job) throw new NotFoundException(`Job not found`);

        return job;
    }

    async create(body: JobSDto) {
        return this.jobModel.create(body);
    }

    async update(id: Types.ObjectId, job: JobSDto) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const updateJob = await this.jobModel.findByIdAndUpdate(id, { ...job }, { new: true });
        if (!updateJob) throw new NotFoundException(`Job category not found`);

        return updateJob;
    }

    async delete(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const job = await this.jobModel.findByIdAndDelete({ _id: id });
        if (!job) throw new NotFoundException(`Job category not found`);

        return job;
    }
}

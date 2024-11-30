import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, Types } from "mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Jobs } from "./entities/jobs.entity";
import { JobSDto } from "./dto/jobs.dto";

@Injectable()
export class JobsService {
    constructor(
        @InjectModel(Jobs.name)
        private readonly jobModel: PaginateModel<Jobs>
    ) {}

    async getAll(page: number = 1, limit: number = 10) {
        const query = {};

        const options = {
            page,
            limit,
        };

        return this.jobModel.paginate(query, options);
    }

    async getAllPublic() {
        return this.jobModel.paginate({}, { page: 1, limit: 6 });
    }

    async search(
        page: number,
        limit: number,
        searchTerm: string,
        categoryId: string | null,
        // type: string,
        // level: string,
        // education: string,
        sortBy: string,
        sortType: string
    ) {
        const query: any = {};

        const sort = { [sortBy]: sortType === "desc" ? -1 : 1 };

        const options = {
            page,
            limit,
            sort,
            populate: {
                path: "category",
            },
        };

        if (searchTerm.length) {
            query.searchTerm = {
                $or: [
                    { positionName: { $regex: searchTerm, $options: "i" } },
                    { companyName: { $regex: searchTerm, $options: "i" } },
                    { description: { $regex: searchTerm, $options: "i" } },
                    { location: { $regex: searchTerm, $options: "i" } },
                ],
            };
        }

        if (categoryId) {
            const castedCategoryId = new Types.ObjectId(categoryId);
            if (Types.ObjectId.isValid(castedCategoryId)) {
                query.category = castedCategoryId;
            }
        }

        // if (type) {
        //     query.type = type;
        // }

        // if (level) {
        //     query.level = level;
        // }

        // if (education) {
        //     query.education = education;
        // }

        console.log(query, options);

        return this.jobModel.paginate(query, options);
    }

    async getOne(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const job = await this.jobModel.findById(id);
        if (!job) throw new NotFoundException(`Job not found`);

        return job;
    }

    async create(body: JobSDto) {
        body.category = new Types.ObjectId(body.category);
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

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ReportsDTO } from "./dto/reports.dto";
import { PaginateModel, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ReportsModel } from "./entities/report.entity";

@Injectable()
export class ReportsService {
    constructor(
        @InjectModel(ReportsModel.name)
        private readonly reportsModel: PaginateModel<ReportsModel>
    ) {}

    getAll(page: number, limit: number) {
        const query = {};

        const options = {
            page,
            limit,
        };

        return this.reportsModel.paginate(query, options);
    }

    async getOne(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect id`);

        const report = await this.reportsModel.findById(id);
        if (!report) throw new NotFoundException(`Report not found`);

        return report;
    }

    async create(body: ReportsDTO) {
        return this.reportsModel.create(body);
    }

    async update(id: Types.ObjectId, body: ReportsDTO) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const updatedReport = await this.reportsModel.findByIdAndUpdate(id, { ...body }, { new: true });
        if (!updatedReport) throw new NotFoundException(`Report not found`);

        return updatedReport;
    }

    async delete(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const report = await this.reportsModel.findByIdAndDelete({ _id: id });
        if (!report) throw new NotFoundException(`Report not found`);

        return report;
    }
}

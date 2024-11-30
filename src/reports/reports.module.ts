import { Module } from "@nestjs/common";
import { ReportsController } from "./reports.controller";
import { ReportsService } from "./reports.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ReportsModel, ReportsSchema } from "./entities/report.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ReportsModel.name,
                schema: ReportsSchema,
            },
        ]),
    ],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule {}

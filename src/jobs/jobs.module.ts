import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JobsModel, JobsSchema } from "./entities/jobs.entity";
import { JobsService } from "./jobs.service";
import { JobsController } from "./jobs.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: JobsModel.name,
                schema: JobsSchema,
            },
        ]),
    ],
    controllers: [JobsController],
    providers: [JobsService],
})
export class JobsModule {}

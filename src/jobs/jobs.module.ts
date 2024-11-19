import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JobsModel, JobsSchema } from "./entities/jobs.entity";
import { JobsService } from "./jobs.service";
import { JobsController } from "./jobs.controller";
import { JwtService } from "@nestjs/jwt";

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
    providers: [JwtService, JobsService],
})
export class JobsModule {}

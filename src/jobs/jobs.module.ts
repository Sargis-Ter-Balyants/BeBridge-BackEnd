import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Jobs, JobsSchema } from "./entities/jobs.entity";
import { JobsService } from "./jobs.service";
import { JobsController } from "./jobs.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Jobs.name,
                schema: JobsSchema,
            },
        ]),
    ],
    controllers: [JobsController],
    providers: [JwtService, JobsService],
})
export class JobsModule {}

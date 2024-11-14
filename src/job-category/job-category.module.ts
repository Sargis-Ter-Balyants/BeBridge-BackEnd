import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JobCategoriesModel, JobCategoriesSchema } from "./job-category.model";
import { JobCategoriesController } from "./job-category.controller";
import { JobCategoriesService } from "./job-category.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: JobCategoriesModel.name,
                schema: JobCategoriesSchema,
            },
        ]),
    ],
    controllers: [JobCategoriesController],
    providers: [JobCategoriesService],
})
export class JobCategoriesModule {}

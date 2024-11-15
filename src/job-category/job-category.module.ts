import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobCategory, JobCategorySchema } from './entities/job-category.entity';
import { JobCategoryController } from './job-category.controller';
import { JobCategoryService } from './job-category.service';

@Module({
  imports: [
    MongooseModule.forFeature([ {
      name: JobCategory.name,
      schema: JobCategorySchema
    } ])
  ],
  controllers: [ JobCategoryController ],
  providers: [ JobCategoryService ]
})
export class JobCategoriesModule {}

import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { NewsModel, NewsSchema } from "./entities/news.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: NewsModel.name,
                schema: NewsSchema,
            },
        ]),
    ],
    controllers: [NewsController],
    providers: [NewsService],
})
export class NewsModule {}

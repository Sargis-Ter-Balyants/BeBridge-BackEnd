import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, Types } from "mongoose";
import { NewsModel } from "./entities/news.entity";
import { NewsDTO } from "./dto/news.dto";

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(NewsModel.name)
        private readonly newsModel: PaginateModel<NewsModel>
    ) {}

    getAll(page: number = 1, limit: number = 10) {
        const query = {};

        const options = {
            page,
            limit,
            query
        };

        return this.newsModel.paginate(options);
    }

    // This is going to be different based on our needs
    search(page: number = 1, limit: number = 10) {
        const query = {};

        const options = {
            page,
            limit,
            query
        };

        return this.newsModel.paginate(options);
    }

    findOne(id: Types.ObjectId) {
        const news = this.newsModel.findById(new Types.ObjectId(id));

        if (!news) throw new NotFoundException(`News not found`);

        return news;
    }

    create(body: NewsDTO) {
        return this.newsModel.create(body);
    }

    update(id: Types.ObjectId, body: NewsDTO) {
        const updatedNews = this.newsModel.findByIdAndUpdate(new Types.ObjectId(id), { ...body }, { new: true });

        if (!updatedNews) throw new NotFoundException(`News not found`);

        return updatedNews;
    }

    delete(id: Types.ObjectId) {
        const news = this.newsModel.findByIdAndDelete({ _id: id });

        if (!news) throw new NotFoundException(`News not found`);

        return news;
    }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { Types } from "mongoose";
import { NewsService } from "./news.service";
import { NewsDTO } from "./dto/news.dto";
import { ParseNumber } from "src/utils/pipes/parseNumber.pipe";
import { ParseObjectId } from "src/utils/pipes/parseObjectId.pipe";

@Controller("news")
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get("")
    getAll(@Query("page", ParseNumber) page: number, @Query("limit", ParseNumber) limit: number) {
        return this.newsService.getAll(page, limit);
    }

    @Get("search")
    search(@Query("page", ParseNumber) page: number, @Query("limit", ParseNumber) limit: number) {
        return this.newsService.search(page, limit);
    }

    @Get(":id")
    findOne(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.newsService.findOne(id);
    }

    @UseGuards()
    @Post()
    create(@Body() body: NewsDTO) {
        return this.newsService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseObjectId) id: Types.ObjectId, @Body() body: NewsDTO) {
        return this.newsService.update(id, body);
    }

    @Delete(":id")
    remove(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.newsService.delete(id);
    }
}

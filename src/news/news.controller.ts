import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from "@nestjs/common";
import { Types } from "mongoose";
import { NewsService } from "./news.service";
import { NewsDTO } from "./dto/news.dto";

import { ParseObjectId } from "src/utils/pipes/parseObjectId.pipe";

@Controller("news")
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get("")
    getAll(@Query("page", ParseIntPipe) page: number, @Query("limit", ParseIntPipe) limit: number) {
        return this.newsService.getAll(page, limit);
    }

    @Get("search")
    search(@Query("page", ParseIntPipe) page: number, @Query("limit", ParseIntPipe) limit: number) {
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

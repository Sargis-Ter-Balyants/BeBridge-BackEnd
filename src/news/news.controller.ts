import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { Types } from "mongoose";
import { ParseObjectIdPipe } from "pipes/objectIdPipe.pipe";
import { ParsePageAndLimitPipe } from "pipes/pageAndLimit.pipe";
import { NewsService } from "./news.service";
import { NewsDTO } from "./dto/news.dto";

@Controller("news")
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get("")
    getAll(@Query("page", ParsePageAndLimitPipe) page: number, @Query("limit", ParsePageAndLimitPipe) limit: number) {
        return this.newsService.getAll(page, limit);
    }

    @Get("search")
    search(@Query("page", ParsePageAndLimitPipe) page: number, @Query("limit", ParsePageAndLimitPipe) limit: number) {
        return this.newsService.search(page, limit);
    }

    @Get(":id")
    findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.newsService.findOne(id);
    }

    @UseGuards()
    @Post()
    create(@Body() body: NewsDTO) {
        return this.newsService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() body: NewsDTO) {
        return this.newsService.update(id, body);
    }

    @Delete(":id")
    remove(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.newsService.delete(id);
    }
}

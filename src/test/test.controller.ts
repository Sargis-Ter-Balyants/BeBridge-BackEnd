import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { Types } from "mongoose";
import { TestService } from "./test.service";

@Controller("test")
export class TestController {
    constructor(private readonly testService: TestService) {}

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.testService.findOne(new Types.ObjectId(id));
    }

    @Get("search")
    search(@Query("tags") query: string[]) {
        return this.testService.search(query);
    }

    @Post("check")
    check() {
        return this.testService.check();
    }
}

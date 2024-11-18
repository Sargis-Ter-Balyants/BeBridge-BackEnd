import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JobSDto } from "./dto/jobs.dto";
import { JobsService } from "./jobs.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/role.guard";
import { ParseObjectIdPipe } from "src/pipes/objectIdPipe.pipe";
import { Role } from "src/user/entities/user.entity";
import { Roles } from "src/auth/role.decorator";

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.EMPLOYEE, Role.EMPLOYER, Role.MODERATOR)
@Controller("jobs")
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @UseGuards()
    @Get()
    async getAll(@Query("page") page: string, @Query("limit") limit: string) {
        return this.jobsService.getAll(parseInt(page), parseInt(limit));
    }

    @Get("search")
    async search(@Query("limit") limit: string) {
        return this.jobsService.search();
    }

    @Get(":id")
    async findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.jobsService.getOne(id);
    }

    @Post()
    async create(@Body() body: JobSDto) {
        return this.jobsService.create(body);
    }

    @Patch(":id")
    async update(@Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() body: JobSDto) {
        return this.jobsService.update(id, body);
    }

    @Delete(":id")
    async delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.jobsService.delete(id);
    }
}

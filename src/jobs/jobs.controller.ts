import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JobSDto } from "./dto/jobs.dto";
import { JobsService } from "./jobs.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/role.guard";
import { ParseObjectIdPipe } from "pipes/objectIdPipe.pipe";
import { Role } from "src/user/entities/user.entity";
import { Roles } from "src/auth/role.decorator";
import { ParsePageAndLimitPipe } from "pipes/pageAndLimit.pipe";

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.EMPLOYEE, Role.EMPLOYER, Role.MODERATOR)
@Controller("jobs")
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    async getAll(
        @Query("page", ParsePageAndLimitPipe) page: number,
        @Query("limit", ParsePageAndLimitPipe) limit: number
    ) {
        return this.jobsService.getAll(page, limit);
    }

    @UseGuards()
    @Get("public")
    async getAllPublic() {
        return this.jobsService.getAllPublic();
    }

    @Get("search")
    async search(
        @Query("search_term") searchTerm: string,
        @Query("page", ParsePageAndLimitPipe) page: number,
        @Query("limit", ParsePageAndLimitPipe) limit: number
    ) {
        return this.jobsService.search(page, limit, searchTerm);
    }

    @Get(":id")
    async findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.jobsService.getOne(id);
    }

    @Roles(Role.EMPLOYER, Role.MODERATOR)
    @Post()
    async create(@Body() body: JobSDto) {
        return this.jobsService.create(body);
    }

    @Roles(Role.EMPLOYER, Role.MODERATOR)
    @Patch(":id")
    async update(@Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() body: JobSDto) {
        return this.jobsService.update(id, body);
    }

    @Roles(Role.EMPLOYER, Role.MODERATOR)
    @Delete(":id")
    async delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.jobsService.delete(id);
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JobSDto } from "./dto/jobs.dto";
import { JobsService } from "./jobs.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/role.guard";
import { Role } from "src/user/entities/user.entity";
import { Roles } from "src/auth/role.decorator";
import { ParseNumber } from "src/utils/pipes/parseNumber.pipe";
import { ParseObjectId } from "src/utils/pipes/parseObjectId.pipe";

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.EMPLOYEE, Role.EMPLOYER, Role.MODERATOR)
@Controller("jobs")
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    getAll(@Query("page", ParseNumber) page: number, @Query("limit", ParseNumber) limit: number) {
        return this.jobsService.getAll(page, limit);
    }

    @UseGuards()
    @Get("public")
    getAllPublic() {
        return this.jobsService.getAllPublic();
    }

    @Get("search")
    search(
        @Query("search_term") searchTerm: string,
        @Query("page", ParseNumber) page: number,
        @Query("limit", ParseNumber) limit: number,
        @Query("category_id") categoryId: string,
        // @Query("type") type: string,
        // @Query("level") level: string,
        // @Query("education") education: string,
        @Query("sort_by") sortBy: string,
        @Query("sort_type") sortType: string
    ) {
        return this.jobsService.search(
            page || 1,
            limit || 10,
            searchTerm || "",
            categoryId || null,
            sortBy || "createdAt",
            sortType || "desc"
        );
        // return this.jobsService.search(page, limit, searchTerm, categoryId, type, level, education, sortBy, sortType);
    }

    @Get(":id")
    findOne(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.jobsService.getOne(id);
    }

    @Roles(Role.EMPLOYER, Role.MODERATOR)
    @Post()
    create(@Body() body: JobSDto) {
        return this.jobsService.create(body);
    }

    @Roles(Role.EMPLOYER, Role.MODERATOR)
    @Patch(":id")
    update(@Param("id", ParseObjectId) id: Types.ObjectId, @Body() body: JobSDto) {
        return this.jobsService.update(id, body);
    }

    @Roles(Role.EMPLOYER, Role.MODERATOR)
    @Delete(":id")
    delete(@Param("id", ParseObjectId) id: Types.ObjectId) {
        return this.jobsService.delete(id);
    }
}

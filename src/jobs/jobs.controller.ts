import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JobSDto } from "./dto/jobs.dto";
import { JobsService } from "./jobs.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RoleGuard } from "src/auth/role.guard";
import { Role } from "src/user/entities/user.entity";
import { Roles } from "src/auth/role.decorator";

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.EMPLOYEE, Role.EMPLOYER, Role.MODERATOR)
@Controller("jobs")
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    getAll(@Query("page") page: string, @Query("limit") limit: string) {
        return this.jobsService.getAll(parseInt(page), parseInt(limit));
    }

    @UseGuards()
    @Get("public")
    getAllPublic() {
        return this.jobsService.getAllPublic();
    }

    @Get("search")
    search(
        @Query("search_term") searchTerm: string,
        @Query("page") page: string,
        @Query("limit") limit: string,
        @Query("category_id") categoryId: string,
        // @Query("type") type: string,
        // @Query("level") level: string,
        // @Query("education") education: string,
        @Query("sort_by") sortBy: string,
        @Query("sort_type") sortType: string
    ) {
        return this.jobsService.search(
            parseInt(page),
            parseInt(limit),
            searchTerm || "",
            categoryId || null,
            sortBy || "createdAt",
            sortType || "desc"
        );
        // return this.jobsService.search(parseInt(page), parseInt(limit), searchTerm, categoryId, type, level, education, sortBy, sortType);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.jobsService.getOne(new Types.ObjectId(id));
    }

    @Roles(Role.EMPLOYER, Role.MODERATOR)
    @Post()
    create(@Body() body: JobSDto) {
        return this.jobsService.create(body);
    }

    @Roles(Role.EMPLOYER, Role.MODERATOR)
    @Patch(":id")
    update(@Param("id") id: string, @Body() body: JobSDto) {
        return this.jobsService.update(new Types.ObjectId(id), body);
    }

    @Roles(Role.EMPLOYER, Role.MODERATOR)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.jobsService.delete(new Types.ObjectId(id));
    }
}

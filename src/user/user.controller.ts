import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { UserService } from "./user.service";
import { ProfileDto } from "./dto/profile.dto";
import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/role.guard";
import { Roles } from "../auth/role.decorator";
import { Role } from "./entities/user.entity";
import { ParseObjectIdPipe } from "pipes/objectIdPipe.pipe";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.EMPLOYEE)
    @Get(":id")
    findOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.userService.get(id);
    }

    @Patch(":id")
    update(@Param("id", ParseObjectIdPipe) id: Types.ObjectId, @Body() profile: ProfileDto) {
        return this.userService.update(id, profile);
    }

    @Delete(":id")
    remove(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.userService.remove(id);
    }
}

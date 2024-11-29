import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Types } from 'mongoose';
import { TestService } from './test.service';
import { RoleGuard } from '../../auth/role.guard';
import { Roles } from '../../auth/role.decorator';
import { Role } from '../../user/entities/user.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { AuthGuard, RequestWithUser } from '../../auth/auth.guard';
import { ParseObjectId } from 'src/utils/pipes/parseObjectId.pipe';

@Controller('admin/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Post()
  create(@Req() req: RequestWithUser, @Body() createTestDto: CreateTestDto) {
    return this.testService.create(req.user, createTestDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Get(':id')
  findOne(@Param('id', ParseObjectId) id: Types.ObjectId) {
    return this.testService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Patch(':id')
  update(@Req() req: RequestWithUser, @Param('id', ParseObjectId) id: Types.ObjectId, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(req.user, id, updateTestDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Delete(':id')
  remove(@Req() req: RequestWithUser, @Param('id', ParseObjectId) id: Types.ObjectId) {
    return this.testService.remove(req.user, id);
  }
}

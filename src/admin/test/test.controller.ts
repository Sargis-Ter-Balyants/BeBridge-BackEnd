import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Types } from 'mongoose';
import { Request } from 'express';
import { TestService } from './test.service';
import { RoleGuard } from '../../auth/role.guard';
import { Roles } from '../../auth/role.decorator';
import { Role } from '../../user/entities/user.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { IsObjectId } from '../../utils/object-id.pipe';
import { AuthGuard, JwtPayload } from '../../auth/auth.guard';

@Controller('admin/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Post()
  create(@Req() req: Request, @Body() createTestDto: CreateTestDto) {
    return this.testService.create(req['user'] as JwtPayload, createTestDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Get(':id')
  findOne(@Param('id', IsObjectId) id: Types.ObjectId) {
    return this.testService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Patch(':id')
  update(@Req() req: Request, @Param('id', IsObjectId) id: Types.ObjectId, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(req['user'] as JwtPayload, id, updateTestDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Delete(':id')
  remove(@Req() req: Request, @Param('id', IsObjectId) id: Types.ObjectId) {
    return this.testService.remove(req['user'] as JwtPayload, id);
  }
}

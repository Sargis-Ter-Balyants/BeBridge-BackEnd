import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { Request } from 'express';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { AuthGuard, JwtPayload } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from '../user/entities/user.entity';
import { ParseObjectIdPipe } from '../../pipes/objectIdPipe.pipe';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Post()
  create(@Req() req: Request, @Body() createTestDto: CreateTestDto) {
    return this.testService.create(req['user'] as JwtPayload, createTestDto);
  }

  @Get()
  search(@Query('tags') query: string[]) {
    return this.testService.search(query);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.testService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Patch(':id')
  update(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(req['user'] as JwtPayload, id, updateTestDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.EMPLOYER)
  @Delete(':id')
  remove(@Req() req: Request, @Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.testService.remove(req['user'] as JwtPayload, id);
  }
}

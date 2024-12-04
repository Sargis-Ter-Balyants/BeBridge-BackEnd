import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { TestService } from './test.service';
import { ParseObjectId } from "../pipes/parseObjectId.pipe";

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get(':id')
  findOne(@Param('id', ParseObjectId) id: Types.ObjectId) {
    return this.testService.findOne(id);
  }

  @Get('search')
  search(@Query('tags') query: string[]) {
    return this.testService.search(query);
  }

  @Post('check')
  check() {
    return this.testService.check();
  }
}

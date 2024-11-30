import { Controller, Get, Post, Query } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  findAll() {
    return this.testService.findAll();
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

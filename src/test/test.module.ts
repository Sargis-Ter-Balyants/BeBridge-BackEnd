import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Test, TestSchema } from './entities/test.entity';

@Module({
  imports: [
    MongooseModule.forFeature([ {
      name: Test.name,
      schema: TestSchema
    } ])
  ],
  controllers: [ TestController ],
  providers: [ TestService, JwtService ]
})
export class TestModule {}

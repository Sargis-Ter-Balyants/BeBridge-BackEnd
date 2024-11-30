import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Test, TestSchema } from '../../test/entities/test.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([ {
      name: Test.name,
      schema: TestSchema
    } ]),
    MulterModule.register({
      dest: path.join(__dirname, '../../uploads')
    })
  ],
  controllers: [ TestController ],
  providers: [ TestService, JwtService ]
})
export class TestModule {}

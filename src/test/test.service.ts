import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name)
    private readonly testModel: Model<Test>
  ) {}

  async findAll() {
    return this.testModel.find({
      published: true
    }, {
      'answers.correct': 0
    });
  }

  async search(query: string[]) {
    return this.testModel.find({
      published: true,
      tags: { $in: query }
    }, {
      'answers.correct': 0
    });
  }

  async check() {
    return true;
  }
}

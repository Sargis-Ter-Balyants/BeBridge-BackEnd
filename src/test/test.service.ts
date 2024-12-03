import { Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name)
    private readonly testModel: Model<Test>
  ) {}

  async findOne(id: Types.ObjectId) {
    const test = await this.testModel.findOne({
      _id: id,
      published: true
    }, {
      'answers.correct': 0
    }).populate('job');

    if (!test) throw new NotFoundException('Test not found');

    return test;
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

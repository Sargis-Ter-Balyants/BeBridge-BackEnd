import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Test } from './entities/test.entity';
import { JwtPayload } from '../auth/auth.guard';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name)
    private readonly testModel: Model<Test>
  ) {}

  async create(payload: JwtPayload, createTestDto: CreateTestDto) {
    return this.testModel.create({
      ...createTestDto,
      createdBy: new Types.ObjectId(payload.id),
      updatedBy: new Types.ObjectId(payload.id)
    });
  }

  async search(query: string[]) {
    return this.testModel.find({
      published: true,
      tags: { $in: query }
    });
  }

  async findAll() {
    return this.testModel.find({ published: true });
  }

  async findOne(id: Types.ObjectId) {
    const test = await this.testModel.findOne({ _id: id, published: true });

    if (!test) throw new NotFoundException('Test not found');
  }

  async update(payload: JwtPayload, id: Types.ObjectId, updateTestDto: UpdateTestDto) {
    const test = await this.testModel.findOneAndUpdate({ _id: id }, {
      ...updateTestDto,
      updatedBy: new Types.ObjectId(payload.id)
    }, {
      new: true
    });

    if (!test) throw new NotFoundException('Test not found');

    return test;
  }

  async remove(_payload: JwtPayload, id: Types.ObjectId) {
    const test = await this.testModel.findOneAndDelete({ _id: id });

    if (!test) throw new NotFoundException('Test not found');
  }
}

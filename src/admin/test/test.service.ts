import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayload } from '../../auth/auth.guard';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from '../../test/entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name)
    private readonly testModel: Model<Test>
  ) {}

  async create(payload: JwtPayload, createTestDto: CreateTestDto, images: { [key: string]: Express.Multer.File[] }) {
    const data = Object.values(images).flat();

    for (let i = 0; i < createTestDto.answers.length; i++) {
      createTestDto.answers[i].image = data.find(image => image.fieldname === `answers[${ i }][image]`).path;
    }

    return this.testModel.create({
      ...createTestDto,
      createdBy: new Types.ObjectId(payload.id),
      updatedBy: new Types.ObjectId(payload.id)
    });
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

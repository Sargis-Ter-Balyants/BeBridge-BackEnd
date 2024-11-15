import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileDto } from './dto/profile.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {}

  async get(id: Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Incorrect query');

    const user = await this.userModel.findOne({ _id: id }, '-password');
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: Types.ObjectId, profile: ProfileDto) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Incorrect query');

    if (profile.password && profile.confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      profile.password = await bcrypt.hash(profile.password, salt);
    } // TODO needs to be improved

    const user = await this.userModel.findOneAndUpdate({
      _id: id
    }, {
      ...profile
    }, {
      new: true,
      projection: '-password'
    });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async remove(id: Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Incorrect query');

    const user = await this.userModel.findOneAndDelete({
      _id: id
    }, {
      projection: '-password'
    });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}

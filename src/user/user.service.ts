import * as bcrypt from 'bcrypt';
import { Model, PopulateOptions, Types } from 'mongoose';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from '../auth/auth.guard';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserSettingsDto } from './dto/user-settings.dto';
import { Education } from './entities/education.entity';
import { UserEducationDto } from './dto/user-education.dto';
import { UserExperienceDto } from './dto/user-experience.dto';
import { Experience } from './entities/experience.entity';
import { Skill } from './entities/skill.entity';
import { UserSkillDto } from './dto/user-skill.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Education.name)
    private readonly educationModel: Model<Education>,
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
    @InjectModel(Experience.name)
    private readonly experienceModel: Model<Experience>,
    @InjectModel(Skill.name)
    private readonly skillModel: Model<Skill>
  ) {}

  async me(payload: JwtPayload, query: { populate: string[] }) {
    const populate = query.populate.map((item: string) => ({
      path: item,
      model: item.charAt(0).toUpperCase() + item.slice(1)
    })) as PopulateOptions[];

    const user = await this.userModel
      .findById(payload.id, '-password')
      .populate(populate)
      .exec();

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }

  async account(payload: JwtPayload, accountDto: UserProfileDto) {
    const user = await this.userModel
      .findById(payload.id)
      .populate('profile');

    if (!user) throw new NotFoundException('User not found');

    const profile = await this.profileModel.findOneAndUpdate(
      { user: new Types.ObjectId(user.id) },
      { ...accountDto },
      { new: true, upsert: true }
    );

    if (!user.profile) {
      user.profile = profile;
      await user.save();
    }

    return profile;
  }

  async education(payload: JwtPayload, educationDto: UserEducationDto) {
    const user = await this.userModel
      .findById(payload.id)
      .populate('education');

    if (!user) throw new UnauthorizedException('User not found');

    const education = await this.educationModel.findOneAndUpdate(
      { user: new Types.ObjectId(user.id), institution: educationDto.institution },
      { ...educationDto },
      { new: true, upsert: true }
    );

    if (!user.education.includes(education.id)) {
      user.education.push(education.id);
      await user.save();
    }

    return education;
  }

  async experience(payload: JwtPayload, experienceDto: UserExperienceDto) {
    const user = await this.userModel
      .findById(payload.id)
      .populate('experience');

    if (!user) throw new UnauthorizedException('User not found');

    const experience = await this.experienceModel.findOneAndUpdate(
      { user: new Types.ObjectId(user.id) },
      { ...experienceDto },
      { new: true, upsert: true }
    );

    if (!user.experience.includes(experience.id)) {
      user.experience.push(experience.id);
      await user.save();
    }

    return experience;
  }

  async skill(payload: JwtPayload, skillDto: UserSkillDto) {
    const user = await this.userModel
      .findById(payload.id)
      .populate('skill');

    if (!user) throw new UnauthorizedException('User not found');

    const skill = await this.skillModel.findOneAndUpdate(
      { user: new Types.ObjectId(user.id) },
      { ...skillDto },
      { new: true, upsert: true }
    );

    if (!user.skill.includes(skill.id)) {
      user.skill.push(skill.id);
      await user.save();
    }

    return skill;
  }

  async settings(payload: JwtPayload, settingsDto: UserSettingsDto) {
    const user = await this.userModel.findOne({ _id: payload.id });
    if (!user) throw new UnauthorizedException('User not found');

    if (settingsDto.currentPassword) {
      const isCorrectPassword = await bcrypt.compare(settingsDto.currentPassword, user.password);
      if (!isCorrectPassword) throw new UnauthorizedException('Invalid credentials');

      if ((settingsDto.password && settingsDto.confirmPassword) && (settingsDto.password === settingsDto.confirmPassword)) {
        const salt = await bcrypt.genSalt(10);
        settingsDto.password = await bcrypt.hash(settingsDto.password, salt);
      }
    }

    return this.userModel.findByIdAndUpdate(
      payload.id,
      { ...settingsDto },
      { new: true, projection: '-password' }
    );
  }

  async remove(payload: JwtPayload) {
    const user = await this.userModel.findByIdAndDelete(
      payload.id,
      { projection: '-password' }
    );
    if (!user) throw new UnauthorizedException('User not found');
  }
}

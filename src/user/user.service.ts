import * as bcrypt from 'bcrypt';
import { Model, PopulateOptions, Types } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from '../auth/auth.guard';
import { User } from './entities/user.entity';
import { Skill } from './entities/skill.entity';
import { SkillDto } from './dto/skill.dto';
import { Profile } from './entities/profile.entity';
import { ProfileDto } from './dto/profile.dto';
import { Education } from './entities/education.entity';
import { EducationDto } from './dto/education.dto';
import { Experience } from './entities/experience.entity';
import { ExperienceDto } from './dto/experience.dto';
import { SettingsDto } from './dto/settings.dto';
import { Jobs } from '../jobs/entities/jobs.entity';

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
    private readonly skillModel: Model<Skill>,
    @InjectModel(Jobs.name)
    private readonly jobModel: Model<Jobs>
  ) {}

  async me(payload: JwtPayload, query: { populate: string[] }) {
    const populate = query.populate.map((item) => {
      return {
        path: item,
        model: item === 'bookmark' ? 'Jobs' : item.charAt(0).toUpperCase() + item.slice(1)
      }
    }) as PopulateOptions[];

    const user = await this.userModel
      .findById(payload.id, '-password')
      .populate(populate)
      .exec();

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }

  async account(payload: JwtPayload, accountDto: ProfileDto, avatar?: Express.Multer.File) {
    const user = await this.userModel
      .findById(payload.id)
      .populate('profile');

    if (!user) throw new NotFoundException('User not found');

    const profile = await this.profileModel.findOneAndUpdate(
      { user: new Types.ObjectId(user.id) },
      {
        ...accountDto,
        avatar: avatar.path
      },
      { new: true, upsert: true }
    );

    if (!user.profile) {
      user.profile = profile.id;
      await user.save();
    }

    return profile;
  }

  async education(payload: JwtPayload, educationDto: EducationDto) {
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

  async experience(payload: JwtPayload, experienceDto: ExperienceDto) {
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

  async skill(payload: JwtPayload, skillDto: SkillDto) {
    const user = await this.userModel
      .findById(payload.id)
      .populate('skills');

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

  async settings(payload: JwtPayload, settingsDto: SettingsDto) {
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

  async bookmark(payload: JwtPayload, id: Types.ObjectId) {
    const job = await this.jobModel.findById(id);
    if (!job) throw new BadRequestException('Job not found');

    const user = await this.userModel.findByIdAndUpdate(
      payload.id,
      [ {
        $set: {
          bookmark: {
            $cond: {
              if: { $in: [ new Types.ObjectId(id), '$bookmark' ] },
              then: { $setDifference: [ '$bookmark', [ new Types.ObjectId(id) ] ] },
              else: { $concatArrays: [ '$bookmark', [ new Types.ObjectId(id) ] ] }
            }
          }
        }
      } ],
      { new: true }
    ).populate({
      path: 'bookmark',
      model: 'Jobs'
    });
    if (!user) throw new UnauthorizedException('User not found');

    return user.bookmark;
  }

  async remove(payload: JwtPayload) {
    const user = await this.userModel.findByIdAndDelete(
      payload.id,
      { projection: '-password' }
    );
    if (!user) throw new UnauthorizedException('User not found');
  }
}

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Profile, ProfileSchema } from './entities/profile.entity';
import { Education, EducationSchema } from './entities/education.entity';
import { Experience, ExperienceSchema } from './entities/experience.entity';
import { Skill, SkillSchema } from './entities/skill.entity';

@Module({
  imports: [
    MongooseModule.forFeature([ {
      name: User.name,
      schema: UserSchema
    }, {
      name: Profile.name,
      schema: ProfileSchema
    }, {
      name: Education.name,
      schema: EducationSchema
    }, {
      name: Experience.name,
      schema: ExperienceSchema
    }, {
      name: Skill.name,
      schema: SkillSchema
    } ])
  ],
  controllers: [ UserController ],
  providers: [ JwtService, UserService ]
})
export class UserModule {}

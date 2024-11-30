import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { MeDto } from './dto/me.dto';
import { ProfileDto } from './dto/profile.dto';
import { SettingsDto } from './dto/settings.dto';
import { EducationDto } from './dto/education.dto';
import { ExperienceDto } from './dto/experience.dto';
import { SkillDto } from './dto/skill.dto';
import { UserService } from './user.service';
import { AuthGuard, RequestWithUser } from '../auth/auth.guard';
import { ParseObjectId } from '../utils/pipes/parseObjectId.pipe';
import { multer } from '../utils/multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser, @Query() query: MeDto) {
    return this.userService.me(req.user, query);
  }

  @UseGuards(AuthGuard)
  @Patch('account')
  @UseInterceptors(FileInterceptor('avatar', multer))
  account(
    @Req() req: RequestWithUser,
    @Body() account: ProfileDto,
    @UploadedFile() avatar: Express.Multer.File
  ) {
    return this.userService.account(req.user, account, avatar);
  }

  @UseGuards(AuthGuard)
  @Patch('education')
  education(@Req() req: RequestWithUser, @Body() education: EducationDto) {
    return this.userService.education(req.user, education);
  }

  @UseGuards(AuthGuard)
  @Patch('experience')
  experience(@Req() req: RequestWithUser, @Body() experience: ExperienceDto) {
    return this.userService.experience(req.user, experience);
  }

  @UseGuards(AuthGuard)
  @Patch('skill')
  skill(@Req() req: RequestWithUser, @Body() skill: SkillDto) {
    return this.userService.skill(req.user, skill);
  }

  @UseGuards(AuthGuard)
  @Patch('settings')
  settings(@Req() req: RequestWithUser, @Body() settings: SettingsDto) {
    return this.userService.settings(req.user, settings);
  }

  @UseGuards(AuthGuard)
  @Patch('bookmark/:id')
  bookmark(@Req() req: RequestWithUser, @Param('id', ParseObjectId) id: Types.ObjectId) {
    return this.userService.bookmark(req.user, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Req() req: RequestWithUser) {
    return this.userService.remove(req.user);
  }
}

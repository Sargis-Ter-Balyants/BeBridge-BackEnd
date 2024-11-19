import { Body, Controller, Delete, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { AuthGuard, JwtPayload } from '../auth/auth.guard';
import { UserMeDto } from './dto/user-me.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserSettingsDto } from './dto/user-settings.dto';
import { UserEducationDto } from './dto/user-education.dto';
import { UserExperienceDto } from './dto/user-experience.dto';
import { UserSkillDto } from './dto/user-skill.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request, @Query() query: UserMeDto) {
    return this.userService.me(req['user'] as JwtPayload, query);
  }

  @UseGuards(AuthGuard)
  @Patch('account')
  account(@Req() req: Request, @Body() account: UserProfileDto) {
    return this.userService.account(req['user'] as JwtPayload, account);
  }

  @UseGuards(AuthGuard)
  @Patch('education')
  education(@Req() req: Request, @Body() education: UserEducationDto) {
    return this.userService.education(req['user'] as JwtPayload, education);
  }

  @UseGuards(AuthGuard)
  @Patch('experience')
  experience(@Req() req: Request, @Body() experience: UserExperienceDto) {
    return this.userService.experience(req['user'] as JwtPayload, experience);
  }

  @UseGuards(AuthGuard)
  @Patch('skill')
  skill(@Req() req: Request, @Body() skill: UserSkillDto) {
    return this.userService.skill(req['user'] as JwtPayload, skill);
  }

  @UseGuards(AuthGuard)
  @Patch('settings')
  settings(@Req() req: Request, @Body() settings: UserSettingsDto) {
    return this.userService.settings(req['user'] as JwtPayload, settings);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Req() req: Request) {
    return this.userService.remove(req['user'] as JwtPayload);
  }
}

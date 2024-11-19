import { Body, Controller, Delete, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { AuthGuard, JwtPayload } from '../auth/auth.guard';
import { MeDto } from './dto/me.dto';
import { ProfileDto } from './dto/profile.dto';
import { SettingsDto } from './dto/settings.dto';
import { EducationDto } from './dto/education.dto';
import { ExperienceDto } from './dto/experience.dto';
import { SkillDto } from './dto/skill.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request, @Query() query: MeDto) {
    return this.userService.me(req['user'] as JwtPayload, query);
  }

  @UseGuards(AuthGuard)
  @Patch('account')
  account(@Req() req: Request, @Body() account: ProfileDto) {
    return this.userService.account(req['user'] as JwtPayload, account);
  }

  @UseGuards(AuthGuard)
  @Patch('education')
  education(@Req() req: Request, @Body() education: EducationDto) {
    return this.userService.education(req['user'] as JwtPayload, education);
  }

  @UseGuards(AuthGuard)
  @Patch('experience')
  experience(@Req() req: Request, @Body() experience: ExperienceDto) {
    return this.userService.experience(req['user'] as JwtPayload, experience);
  }

  @UseGuards(AuthGuard)
  @Patch('skill')
  skill(@Req() req: Request, @Body() skill: SkillDto) {
    return this.userService.skill(req['user'] as JwtPayload, skill);
  }

  @UseGuards(AuthGuard)
  @Patch('settings')
  settings(@Req() req: Request, @Body() settings: SettingsDto) {
    return this.userService.settings(req['user'] as JwtPayload, settings);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Req() req: Request) {
    return this.userService.remove(req['user'] as JwtPayload);
  }
}

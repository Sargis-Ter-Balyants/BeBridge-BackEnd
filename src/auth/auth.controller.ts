import { Controller, Get, Post, Body, Param, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.authService.validateOAuthLogin(req['user']);
    res.redirect(`http://localhost:3000?token=${ jwt }`);
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinAuth(@Req() req: Request) {}

  @Get('linkedin/redirect')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.authService.validateOAuthLogin(req['user']);
    res.redirect(`http://localhost:3000?token=${ jwt }`);
  }

  @Post('signup')
  signup(@Body() signup: SignupDto) {
    return this.authService.signup(signup);
  }

  @Post('signin')
  signin(@Body() signin: SigninDto) {
    return this.authService.signin(signin);
  }

  @Get('confirm/:code')
  confirm(@Param('code') code: string) {
    return this.authService.confirm(code);
  }
}

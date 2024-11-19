import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/entities/user.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async validateOAuthLogin(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async signup(signup: SignupDto) {
    const uniqueEmail = await this.userModel.findOne({ email: signup.email });
    if (uniqueEmail) throw new BadRequestException('User with this email already exists');

    const uniqueUsername = await this.userModel.findOne({ username: signup.username });
    if (uniqueUsername) throw new BadRequestException('User with this username already exists');

    const salt = await bcrypt.genSalt(10);
    signup.password = await bcrypt.hash(signup.password, salt);
    signup.code = crypto.randomBytes(10).toString('hex');

    const user = await this.userModel.create(signup);

    await this.mailService.sendUserConfirmation(user);
  }

  async signin(signin: SigninDto) {
    const user = await this.userModel.findOne({
      confirmed: true,
      username: signin.username
    });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isCorrectPassword = await bcrypt.compare(signin.password, user.password);
    if (!isCorrectPassword) throw new UnauthorizedException('Invalid email or password');

    const accessToken = this.jwtService.sign({
      id: user.id,
      roles: user.roles
    });

    return { accessToken }
  }

  async confirm(code: string) {
    const user = await this.userModel.findOne({
      code,
      confirmed: false
    });
    if (!user) throw new BadRequestException('Incorrect credentials');

    user.code = undefined;
    user.confirmed = true;

    await user.save();
  }
}

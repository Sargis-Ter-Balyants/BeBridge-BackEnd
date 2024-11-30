import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to BeBridge App! Confirm your Email',
      template: 'confirmation',
      context: {
        email: user.email,
        url: `http://localhost:3030/auth/confirm/${ user.code }`
      }
    });
  }
}

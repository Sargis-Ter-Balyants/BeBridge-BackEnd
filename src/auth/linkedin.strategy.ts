import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-linkedin-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>('LINKEDIN_CLIENT_ID'),
      clientSecret: configService.get<string>('LINKEDIN_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/linkedin/redirect',
      scope: [ 'r_emailaddress', 'r_liteprofile' ],
      state: true
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
    const { id, emails, photos, name } = profile;

    const user = {
      id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }

    done(null, user);
  }
}
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from '../mail/mail.service';
import { User, UserSchema } from '../user/entities/user.entity';
import { GoogleStrategy } from './google.strategy';
import { LinkedInStrategy } from './linkedin.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([ {
      name: User.name,
      schema: UserSchema
    } ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRES', '1d')
        }
      })
    })
  ],
  controllers: [ AuthController ],
  providers: [
    AuthService,
    MailService,
    GoogleStrategy,
    LinkedInStrategy
  ]
})
export class AuthModule {}

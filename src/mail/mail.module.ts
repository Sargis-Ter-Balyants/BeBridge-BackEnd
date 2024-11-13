import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAILER_HOST'),
          port: config.get<string>('MAILER_PORT'),
          secure: config.get<string>('MAILER_SECURE') === 'true',
          auth: {
            user: config.get<string>('MAILER_USER'),
            pass: config.get<string>('MAILER_PASS')
          }
        },
        defaults: {
          from: `"No Reply" <${ config.get<string>('MAILER_FROM') }>`
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true
          }
        }
      })
    })
  ],
  providers: [ MailService ],
  exports: [ MailService ]
})
export class MailModule {}

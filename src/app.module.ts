import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailModule } from "./mail/mail.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { JobCategoriesModule } from "./job-category/job-category.module";
import { JobsModule } from "./jobs/jobs.module";
import { ContactUsModule } from "./contact-us/contact-us.module";

const NODE_ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            envFilePath: `.env.${NODE_ENV}`,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>("DB_URI"),
            }),
        }),
        MailModule,
        AuthModule,
        UserModule,
        JobCategoriesModule,
        JobsModule,
        ContactUsModule,
    ],
})
export class AppModule {}

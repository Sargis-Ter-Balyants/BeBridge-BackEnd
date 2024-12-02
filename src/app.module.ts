import * as path from "node:path";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MailModule } from "./mail/mail.module";
import { JobCategoriesModule } from "./job-category/job-category.module";
import { JobsModule } from "./jobs/jobs.module";
import { TestModule } from "./test/test.module";
import { TestModule as AdminTestModule } from "./admin/test/test.module";
import { NewsModule } from "./news/news.module";
import { ReportsModule } from "./reports/reports.module";
import { ContactUsModule } from "./contact-us/contact-us.module";
import { NotificationsModule } from "./notifications/notifications.module";

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
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, "..", "uploads"),
            serveRoot: "/uploads",
        }),
        AuthModule,
        UserModule,
        MailModule,
        JobCategoriesModule,
        JobsModule,
        TestModule,
        AdminTestModule,
        NewsModule,
        ReportsModule,
        ContactUsModule,
        NotificationsModule,
    ],
})
export class AppModule {}

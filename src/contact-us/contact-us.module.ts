import { JwtService } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { ContactUsService } from "./contact-us.service";
import { ContactUsController } from "./contact-us.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ContactUsModel, ContactUsSchema } from "./entities/contact-us.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ContactUsModel.name,
                schema: ContactUsSchema,
            },
        ]),
    ],
    controllers: [ContactUsController],
    providers: [JwtService, ContactUsService],
})
export class ContactUsModule {}

import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class ContactUsDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(500)
    message: string;
}

import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsString, Length } from "class-validator";
import { Types } from "mongoose";

export class JobSDto {
    @IsNotEmpty()
    companyId: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    positionName: string;

    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsDateString()
    positionDeadline: string;

    @IsNotEmpty()
    category: Types.ObjectId;

    @IsNotEmpty()
    @IsArray()
    price: number[];

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    type: "Full-time" | "Part-time" | "Freelance " | "Remote" | "Contract" | "Internship";

    @IsNotEmpty()
    @IsString()
    education:
        | "Bachelor's degree"
        | "Master's degree"
        | "Doctorate"
        | "Diploma/Certificate"
        | "High School"
        | "Vocational Training";

    @IsNotEmpty()
    @IsString()
    level: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    image: string;
}

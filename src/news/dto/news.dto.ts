import { IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class NewsDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    author: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    description: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsString()
    type: string;
}

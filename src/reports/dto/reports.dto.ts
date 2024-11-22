import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class ReportsDTO {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    company: string;

    @IsNotEmpty()
    @IsInt()
    position: string;

    @IsNotEmpty()
    @IsInt()
    totalQuestions: number;

    @IsNotEmpty()
    @IsInt()
    status: 0 | 1 | 2;
}

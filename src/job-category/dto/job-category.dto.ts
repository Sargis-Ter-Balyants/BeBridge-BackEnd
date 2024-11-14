import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class JobCategoriesDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    @IsOptional()
    popularity: number;

    @IsNotEmpty()
    @IsInt()
    @IsOptional()
    availableJobs: number;
}

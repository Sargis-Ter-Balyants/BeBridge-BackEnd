import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class JobCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
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

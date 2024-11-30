import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class EducationDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  institution: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  department: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  degree: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}

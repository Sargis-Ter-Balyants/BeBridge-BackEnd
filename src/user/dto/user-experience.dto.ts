import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserExperienceDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  companyName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  position: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}

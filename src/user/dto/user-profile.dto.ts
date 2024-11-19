import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UserProfileDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  headline: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  biography: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  address: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsUrl()
  @IsOptional()
  behance?: string;

  @IsUrl()
  @IsOptional()
  facebook?: string;

  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @IsUrl()
  @IsOptional()
  youtube?: string;
}

import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class ProfileDto {
  @IsOptional()
  @IsString()
  @Length(2, 12)
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 12)
  surname: string;

  @IsOptional()
  @IsString()
  @Length(2, 12)
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  @Length(8, 12)
  password: string;

  @IsOptional()
  @IsString()
  @Length(8, 12)
  confirmPassword: string;
}

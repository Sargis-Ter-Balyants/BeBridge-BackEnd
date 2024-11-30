import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword, Length } from 'class-validator';

export class SettingsDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  subscribed: boolean;

  @IsOptional()
  currentPassword: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  password: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  confirmPassword: string;
}

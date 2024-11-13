import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 12)
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 12)
  password: string;
}

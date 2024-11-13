import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Role } from '../../user/entities/user.entity';

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

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles: Role[];
}

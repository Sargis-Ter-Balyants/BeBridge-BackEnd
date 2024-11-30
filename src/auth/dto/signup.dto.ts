import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length
} from 'class-validator';
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
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles: Role[];
}

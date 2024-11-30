import { IsString, IsBoolean, IsInt, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class Answer {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  image?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  order: number;

  @Type(() => Boolean)
  @IsBoolean()
  correct: boolean;
}

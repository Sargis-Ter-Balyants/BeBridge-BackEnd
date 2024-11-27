import { IsString, IsBoolean, IsInt, IsOptional, IsNotEmpty, Min } from 'class-validator';

export class Answer {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsInt()
  @Min(1)
  order: number;

  @IsBoolean()
  correct: boolean;
}

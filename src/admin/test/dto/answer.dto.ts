import { IsString, IsBoolean, IsInt, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

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

  @Transform(({value}) => value === 'true')
  @IsBoolean()
  correct: boolean;
}

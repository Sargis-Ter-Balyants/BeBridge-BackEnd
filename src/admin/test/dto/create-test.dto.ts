import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { Answer } from './answer.dto';
import { AnswerType } from '../../../test/entities/test.entity';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 1000)
  question: string;

  @Type(() => Answer)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  answers: Answer[]

  @IsEnum(AnswerType, { each: true })
  answersType: AnswerType;

  @Type(() => Number)
  @IsInt()
  @Min(10 * 60)
  @Max(2 * 60 * 60)
  duration: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: string[];
}

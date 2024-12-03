import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayMinSize,
  IsArray,
  IsEnum, IsInt, IsMongoId,
  IsOptional,
  IsString,
  Length, Max, Min,
  ValidateNested
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Answer } from './answer.dto';
import { CreateTestDto } from './create-test.dto';
import { AnswerType } from '../../../test/entities/test.entity';
import { Types } from 'mongoose';

export class UpdateTestDto extends PartialType(CreateTestDto) {
  @IsOptional()
  @IsMongoId()
  job: Types.ObjectId;

  @IsOptional()
  @IsString()
  @Length(2, 1000)
  question: string;

  @Type(() => Answer)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  answers: Answer[]

  @IsOptional()
  @IsEnum(AnswerType, { each: true })
  answersType: AnswerType;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(10 * 60)
  @Max(2 * 60 * 60)
  duration: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: string[];

  @Transform(({ value }) => value === 'true')
  @IsOptional()
  published: boolean;
}

import { IsArray, IsEnum } from 'class-validator';

export enum PopulateQuery {
  PROFILE = 'profile',
  EDUCATION = 'education',
  EXPERIENCE = 'experience',
  SKILL = 'skill'
}

export class UserMeDto {
  @IsArray()
  @IsEnum(PopulateQuery, { each: true })
  populate: string[];
}

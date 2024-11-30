import { IsArray, IsEnum } from 'class-validator';

export enum PopulateQuery {
  PROFILE = 'profile',
  EDUCATION = 'education',
  EXPERIENCE = 'experience',
  SKILL = 'skill',
  BOOKMARK = 'bookmark'
}

export class MeDto {
  @IsArray()
  @IsEnum(PopulateQuery, { each: true })
  populate: PopulateQuery[];
}

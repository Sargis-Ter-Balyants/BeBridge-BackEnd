import { IsArray, IsEnum } from 'class-validator';

export enum PopulateQuery {
  PROFILE = 'profile',
  EDUCATION = 'education',
  EXPERIENCE = 'experience',
  SKILLS = 'skills',
  JOBS = 'jobs'
}

export class MeDto {
  @IsArray()
  @IsEnum(PopulateQuery, { each: true })
  populate: string[];
}

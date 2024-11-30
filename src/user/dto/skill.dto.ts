import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class SkillDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  skillName: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  frontier: number;
}

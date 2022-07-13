import { IsOptional, IsString } from 'class-validator';

export class PatchCategoryDto {
  @IsOptional()
  @IsString()
  public readonly name: string;
}

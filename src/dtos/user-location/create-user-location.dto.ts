import { ICategory } from '@/interfaces/category.interface';
import { ITag } from '@/interfaces/tag.interface';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateUserLocationDto {
  @IsString()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly description: string;

  @IsArray()
  @IsOptional()
  public readonly tags: Array<ITag>;

  @IsArray()
  @IsOptional()
  public readonly categories: Array<ICategory>;
}

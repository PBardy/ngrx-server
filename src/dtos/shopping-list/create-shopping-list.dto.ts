import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateTagDto } from '../tag/create-tag.dto';

export class CreateShoppingListDto {
  @IsString()
  public readonly name: string;

  @IsOptional()
  @IsArray()
  public readonly tags: Array<CreateTagDto>;
}

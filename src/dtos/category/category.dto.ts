import { ICategory } from '@/interfaces/category.interface';
import { IsString, IsUUID } from 'class-validator';

export class CategoryDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly name: string;

  public constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }

  public static fromModel({ uuid, name }: ICategory): CategoryDto {
    return new CategoryDto(uuid, name);
  }

  public static fromModels(models: Array<ICategory>): Array<CategoryDto> {
    return models.map(CategoryDto.fromModel);
  }
}

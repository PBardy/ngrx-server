import { IProductPropertyCategory } from '@/interfaces/product.interface';
import { IsString, IsUUID } from 'class-validator';

export class ProductPropertyCategoryDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly tag: Uppercase<string>;

  @IsString()
  public readonly label: string;

  public constructor(productPropertyCategory: IProductPropertyCategory) {
    this.uuid = productPropertyCategory.uuid;
    this.tag = productPropertyCategory.tag;
    this.label = productPropertyCategory.label;
  }

  public static fromModel(model: IProductPropertyCategory): ProductPropertyCategoryDto {
    return new ProductPropertyCategoryDto(model);
  }

  public static fromModels(models: Array<IProductPropertyCategory>): Array<ProductPropertyCategoryDto> {
    return models.map(ProductPropertyCategoryDto.fromModel);
  }
}

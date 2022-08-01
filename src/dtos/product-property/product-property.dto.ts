import { IProductProperty } from '@/interfaces/product.interface';
import { IsString, IsUUID } from 'class-validator';
import { ProductPropertyCategoryDto } from '../product-property-category/product-property-category.dto';

export class ProductPropertyDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly tag: Uppercase<string>;

  @IsString()
  public readonly label: string;

  @IsString()
  public readonly category: ProductPropertyCategoryDto;

  public constructor(productProperty: IProductProperty) {
    this.uuid = productProperty.uuid;
    this.tag = productProperty.tag;
    this.label = productProperty.label;
    this.category = ProductPropertyCategoryDto.fromModel(productProperty.category);
  }

  public static fromModel(model: IProductProperty): ProductPropertyDto {
    return new ProductPropertyDto(model);
  }

  public static fromModels(models: Array<IProductProperty>): Array<ProductPropertyDto> {
    return models.map(ProductPropertyDto.fromModel);
  }
}

import { IProduct, ProductAvailability } from '@/interfaces/product.interface';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class ProductDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly slug: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly code: string;

  @IsNumber()
  public readonly price: number;

  @IsEnum(ProductAvailability, { each: true })
  public readonly availability: ProductAvailability;

  public constructor(product: IProduct) {
    this.uuid = product.uuid;
    this.slug = product.slug;
    this.name = product.name;
    this.code = product.code;
    this.price = product.price;
    this.availability = product.availability;
  }

  public static fromModel(product: IProduct): ProductDto {
    return new ProductDto(product);
  }

  public static fromModels(models: Array<IProduct>) {
    return models.map(ProductDto.fromModel);
  }
}

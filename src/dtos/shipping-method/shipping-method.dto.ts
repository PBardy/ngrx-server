import { IBaseShippingMethod, IShippingMethod } from '@/interfaces/shipping-method.interface';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class ShippingMethodDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly slug: string;

  @IsNumber()
  public readonly price: number;

  public constructor(shippingMethod: IBaseShippingMethod) {
    this.uuid = shippingMethod.uuid;
    this.name = shippingMethod.name;
    this.slug = shippingMethod.slug;
    this.price = shippingMethod.price;
  }

  public static fromModel(model: IShippingMethod): ShippingMethodDto {
    return new ShippingMethodDto(model);
  }

  public static fromModels(models: Array<IShippingMethod>): Array<ShippingMethodDto> {
    return models.map(ShippingMethodDto.fromModel);
  }
}

import { IsArray, IsOptional, IsString } from 'class-validator';

export class CartCheckoutDto {
  @IsArray()
  public readonly productIds: Array<string>;

  @IsOptional()
  @IsString()
  public readonly promoCode: string;

  @IsString()
  public readonly shippingMethod: string;
}

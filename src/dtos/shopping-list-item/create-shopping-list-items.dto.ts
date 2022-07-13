import { IProduct } from '@/interfaces/product.interface';
import { IsArray } from 'class-validator';

export class CreateShoppingListItemsDto {
  @IsArray()
  public readonly products: Array<IProduct>;
}

import { IShoppingList } from '@/interfaces/shopping-list.interface';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ProductDto } from '../product/product.dto';

export class ShoppingListDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly slug: string;

  @IsArray()
  @ValidateNested({ each: true })
  public readonly items: Array<ProductDto>;

  public constructor(uuid: string, name: string, slug: string, items: Array<ProductDto>) {
    this.uuid = uuid;
    this.name = name;
    this.slug = slug;
    this.items = items;
  }

  public static fromModel({ uuid, name, slug, items }: IShoppingList): ShoppingListDto {
    return new ShoppingListDto(uuid, name, slug, ProductDto.fromModels(items));
  }

  public static fromModels(models: Array<IShoppingList>): Array<ShoppingListDto> {
    return models.map(ShoppingListDto.fromModel);
  }
}

import { IShoppingListItem } from '@/interfaces/shopping-list-item.interface';
import { IsUUID } from 'class-validator';

export class ShoppingListItemDto {
  @IsUUID()
  public readonly uuid: string;

  public constructor(uuid: string) {
    this.uuid = uuid;
  }

  public static fromModel({ uuid }: IShoppingListItem): ShoppingListItemDto {
    return new ShoppingListItemDto(uuid);
  }

  public static fromModels(models: Array<IShoppingListItem>): Array<ShoppingListItemDto> {
    return models.map(ShoppingListItemDto.fromModel);
  }
}

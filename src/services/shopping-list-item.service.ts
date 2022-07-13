import { CreateShoppingListItemsDto } from '@/dtos/shopping-list-item/create-shopping-list-item.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IShoppingListItem } from '@/interfaces/shopping-list-item.interface';
import { Product } from '@/models/product.model';
import { ShoppingListItem } from '@/models/shopping-list-item.model';
import { ShoppingList } from '@/models/shopping-list.model';
import { logger } from '@/utils/logger';
import { cannotViewModel } from '@/utils/util';
import { isEmpty } from 'class-validator';

export class ShoppingListItemService {
  public async getAll(userId: number): Promise<Array<IShoppingListItem>> {
    const shoppingListItems = await ShoppingListItem.query().withGraphJoined('userProduct').withGraphJoined('shoppingList').where('userId', userId);
    return shoppingListItems as unknown as Array<IShoppingListItem>;
  }

  public async getOne(userId: number, uuid: string): Promise<IShoppingListItem> {
    const shoppingListItem = await ShoppingListItem.query().where('uuid', uuid).first();
    return shoppingListItem as unknown as IShoppingListItem;
  }

  public async createOne(userId: number, shoppingListId: string, productId: string): Promise<IShoppingListItem> {
    const product = await Product.query().where('uuid', productId).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product');
    }

    const shoppingList = await ShoppingList.query().where('uuid', shoppingListId).first();
    if (isEmpty(shoppingList)) {
      throw new HttpException(404, 'Could not find shopping list');
    }

    if (cannotViewModel(userId, shoppingList)) {
      throw new HttpException(403, 'You do not have permission to access this shopping list');
    }

    const shoppingListItem = await ShoppingListItem.query().insertAndFetch({
      productId: product.id,
      shoppingListId: shoppingList.id,
    });

    return shoppingListItem as unknown as IShoppingListItem;
  }

  public async createMany(userId: number, shoppingListId: string, dto: CreateShoppingListItemsDto): Promise<Array<IShoppingListItem>> {}

  public async deleteOne(userId: number, uuid: string): Promise<ShoppingListItem> {}
}

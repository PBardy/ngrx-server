import { CreateShoppingListItemsDto } from '@/dtos/shopping-list-item/create-shopping-list-items.dto';
import { RemoveShoppingListItemsDto } from '@/dtos/shopping-list-item/remove-shopping-list-items.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IShoppingListItem } from '@/interfaces/shopping-list-item.interface';
import { Product } from '@/models/product.model';
import { ShoppingListItem } from '@/models/shopping-list-item.model';
import { ShoppingList } from '@/models/shopping-list.model';
import { cannotViewModel } from '@/utils/util';
import { isEmpty } from 'class-validator';

export class ShoppingListItemService {
  public async getAll(userId: number): Promise<Array<IShoppingListItem>> {
    const shoppingListItems = await ShoppingListItem.query().withGraphJoined('userProduct').withGraphJoined('shoppingList').where('userId', userId);
    return shoppingListItems as unknown as Array<IShoppingListItem>;
  }

  public async getOne(userId: number, uuid: string): Promise<IShoppingListItem> {
    const shoppingListItem = await ShoppingListItem.query().where('uuid', uuid).first();
    if (isEmpty(shoppingListItem)) {
      throw new HttpException(404, 'Could not find shopping list item');
    }

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

  public async createMany(userId: number, shoppingListId: string, dto: CreateShoppingListItemsDto): Promise<Array<IShoppingListItem>> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    return await Promise.all(dto.products.map(product => this.createOne(userId, shoppingListId, product.uuid)));
  }

  public async removeOne(userId: number, shoppingListId: string, productId: string): Promise<IShoppingListItem> {
    const product = await Product.query().where('uuid', productId).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product');
    }

    const shoppingList = await ShoppingList.query().where('uuid', shoppingListId).first();
    if (isEmpty(shoppingList)) {
      throw new HttpException(404, 'Could not find shopping list');
    }

    const shoppingListItem = await ShoppingListItem.query().where('productId', product.id).where('shoppingListId', shoppingList.id).first();
    if (isEmpty(shoppingListItem)) {
      throw new HttpException(404, 'Could not find shopping list item');
    }

    return shoppingListItem as unknown as IShoppingListItem;
  }

  public async removeMany(userId: number, shoppingListId: string, dto: RemoveShoppingListItemsDto): Promise<Array<IShoppingListItem>> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    return await Promise.all(dto.products.map(product => this.removeOne(userId, shoppingListId, product.uuid)));
  }
}

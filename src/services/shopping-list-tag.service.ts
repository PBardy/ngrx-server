import { IShoppingListTags } from '@/interfaces/shopping-list.interface';

export class ShoppingListTagService {
  public async createOne(userId: number, shoppingListId: number, tagId: number): Promise<IShoppingListTags> {}
}

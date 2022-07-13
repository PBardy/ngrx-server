import { IModel } from './model.interface';
import { IProduct } from './product.interface';
import { IShoppingList } from './shopping-list.interface';

export interface IBaseShoppingListItem extends IModel {
  productId: number;
  shoppingListId: number;
}

export interface IShoppingListItem extends IBaseShoppingListItem {
  product: IProduct;
  shoppingList: IShoppingList;
}

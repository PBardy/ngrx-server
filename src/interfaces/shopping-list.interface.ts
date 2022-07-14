import { IModel } from './model.interface';
import { IProduct } from './product.interface';
import { ITag } from './tag.interface';
import { IUser } from './user.interface';

export interface IBaseShoppingList extends IModel {
  name: string;
  slug: string;
  userId: number;
}

export interface IShoppingList extends IBaseShoppingList {
  owner: IUser;
  tags: Array<ITag>;
  items: Array<IProduct>;
}

export interface IShoppingListTags extends IModel {
  tagId: number;
  shoppingListId: number;
}

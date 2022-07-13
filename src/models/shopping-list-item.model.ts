import { IBaseShoppingListItem } from '@/interfaces/shopping-list-item.interface';
import { faker } from '@faker-js/faker';
import { Model, ModelObject } from 'objection';

export class ShoppingListItem extends Model implements IBaseShoppingListItem {
  public id: number;
  public uuid: string;
  public productId: number;
  public shoppingListId: number;
  public createdAt: string;
  public updatedAt: string;

  public static idColumn = 'id';
  public static tableName = 'shopping_list_items';

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type ShoppingListItemShape = ModelObject<ShoppingListItem>;

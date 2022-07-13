import { IBaseShoppingList } from '@/interfaces/shopping-list.interface';
import { Model, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection';
import { ShoppingListItem } from './shopping-list-item.model';
import { User } from './user.model';
import slugify from 'slugify';
import { faker } from '@faker-js/faker';
import { Product } from './product.model';

export class ShoppingList extends Model implements IBaseShoppingList {
  public id: number;
  public uuid: string;
  public name: string;
  public slug: string;
  public userId: number;
  public createdAt: string;
  public updatedAt: string;

  public static idColumn = 'id';
  public static tableName = 'shopping_lists';

  public static relationMappings: RelationMappings | RelationMappingsThunk = {
    owner: {
      modelClass: User,
      relation: Model.HasOneRelation,
      join: {
        to: 'users.id',
        from: 'shopping_lists.user_id',
      },
    },
    items: {
      modelClass: Product,
      relation: Model.ManyToManyRelation,
      join: {
        from: 'shopping_lists.id',
        through: {
          to: 'shopping_list_items.product_id',
          from: 'shopping_list_items.shopping_list_id',
        },
        to: 'products.id',
      },
    },
  };

  public $beforeInsert(): void | Promise<any> {
    this.uuid = faker.datatype.uuid();
    this.slug = slugify(this.name);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.slug = slugify(this.name);
    this.updatedAt = new Date().toISOString();
  }

  public static clone(model: ShoppingList) {
    const clone = model.$clone();
    clone.name = clone.name + ' (copy)';
    clone.uuid = faker.datatype.uuid();

    return clone;
  }
}

export type ShoppingListShape = ModelObject<ShoppingList>;

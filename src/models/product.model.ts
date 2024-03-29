import { IProduct, ProductAvailability } from '@/interfaces/product.interface';
import { faker } from '@faker-js/faker';
import { Model, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection';
import { ProductProperty } from './product-property.model';

export class Product extends Model implements IProduct {
  public id: number;
  public uuid: string;
  public name: string;
  public code: string;
  public slug: string;
  public price: number;
  public image: string;
  public description?: string;
  public availability: ProductAvailability;
  public createdAt: string;
  public updatedAt: string;

  public static idColumn = 'id';
  public static tableName = 'products';

  public static relationMappings: RelationMappings | RelationMappingsThunk = {
    shoppingLists: {
      modelClass: Product,
      relation: Model.ManyToManyRelation,
      join: {
        from: 'products.id',
        through: {
          to: 'shopping_list_items.shopping_list_id',
          from: 'shopping_list_items.product_id',
        },
        to: 'shopping_lists.id',
      },
    },
    properties: {
      modelClass: ProductProperty,
      relation: Model.ManyToManyRelation,
      join: {
        from: 'products.id',
        through: {
          to: 'product_properties.product_property_id',
          from: 'product_properties.product_id',
        },
        to: 'product_property.id',
      },
    },
  };

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type ProductShape = ModelObject<Product>;

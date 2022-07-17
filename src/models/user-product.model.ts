import { IBaseUserProduct } from '@/interfaces/user-products.interface';
import { faker } from '@faker-js/faker';
import { Model, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection';
import { User } from './user.model';
import { Product } from './product.model';

export class UserProduct extends Model implements IBaseUserProduct {
  public id: number;
  public uuid: string;
  public userId: number;
  public productId: number;
  public createdAt: string;
  public updatedAt: string;

  static idColumn = 'id';
  static tableName = 'user_products';

  public static relationMappings: RelationMappings | RelationMappingsThunk = {
    user: {
      modelClass: User,
      relation: Model.BelongsToOneRelation,
      join: {
        to: 'users.id',
        from: 'user_products.user_id',
      },
    },
    product: {
      modelClass: Product,
      relation: Model.BelongsToOneRelation,
      join: {
        to: 'products.id',
        from: 'user_products.product_id',
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

export type UserLocationShape = ModelObject<UserProduct>;

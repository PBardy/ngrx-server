import { IBaseUserProduct } from '@/interfaces/user-products.interface';
import { Model, ModelObject } from 'objection';

export class UserProduct extends Model implements IBaseUserProduct {
  public id: number;
  public uuid: string;
  public userId: number;
  public productId: number;

  static idColumn = 'id';
  static tableName = 'user_products';
}

export type UserLocationShape = ModelObject<UserProduct>;

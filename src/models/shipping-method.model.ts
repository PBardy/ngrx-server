import { IBaseShippingMethod } from '@/interfaces/shipping-method.interface';
import { faker } from '@faker-js/faker';
import { Model, ModelObject } from 'objection';
import slugify from 'slugify';

export class ShippingMethod extends Model implements IBaseShippingMethod {
  public id: number;
  public uuid: string;
  public name: string;
  public slug: string;
  public price: number;
  public createdAt: string;
  public updatedAt: string;

  public static idColumn = 'id';
  public static tableName = 'shipping_methods';

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.slug = slugify(this.name);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.slug = slugify(this.name);
    this.updatedAt = new Date().toISOString();
  }
}

export type ShippingMethodShape = ModelObject<ShippingMethod>;

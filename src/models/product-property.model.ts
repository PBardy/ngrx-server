import { IBaseProductProperty } from '@/interfaces/product.interface';
import { faker } from '@faker-js/faker';
import { Model, ModelObject } from 'objection';

export class ProductProperty extends Model implements IBaseProductProperty {
  public id: number;
  public uuid: string;
  public tag: Uppercase<string>;
  public label: string;
  public categoryId: number;
  public createdAt: string;
  public updatedAt: string;

  public static idColumn = 'id';
  public static tableName = 'product_property';

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type ProductProperyShape = ModelObject<ProductProperty>;

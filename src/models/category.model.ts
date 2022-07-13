import { Model, ModelObject } from 'objection';
import { ICategory } from '@/interfaces/category.interface';
import { faker } from '@faker-js/faker';

export class Category extends Model implements ICategory {
  public id: number;
  public uuid: string;
  public name: string;
  public createdAt: string;
  public updatedAt: string;

  public static idColumn = 'id';
  public static tableName = 'categories';

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type CategoryShape = ModelObject<Category>;

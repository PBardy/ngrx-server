import { Model, ModelObject } from 'objection';
import { ITag } from '@/interfaces/tag.interface';
import { faker } from '@faker-js/faker';

export class Tag extends Model implements ITag {
  public id: number;
  public uuid: string;
  public name: string;
  public updatedAt: string;
  public createdAt: string;

  public static idColumn = 'id';
  public static tableName = 'tags';

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type TagShape = ModelObject<Tag>;

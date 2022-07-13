import { Model, ModelObject } from 'objection';
import { ILocation } from '@/interfaces/location.interface';
import { faker } from '@faker-js/faker';

export class Location extends Model implements ILocation {
  public id: number;
  public uuid: string;
  public name: string;
  public description: string | null;
  public createdAt: string;
  public updatedAt: string;

  public static idColumn = 'id';
  public static tableName = 'locations';

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type LocationShape = ModelObject<Location>;

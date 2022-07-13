import { IBaseUserLocation } from '@/interfaces/user-locations.interface';
import { faker } from '@faker-js/faker';
import { Model, ModelObject } from 'objection';

export class UserLocation extends Model implements IBaseUserLocation {
  public id: number;
  public uuid: string;
  public userId: number;
  public locationId: number;
  public createdAt: string;
  public updatedAt: string;

  static idColumn = 'id';
  static tableName = 'user_locations';

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type UserLocationShape = ModelObject<UserLocation>;

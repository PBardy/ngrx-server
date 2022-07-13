import { IUserType, UserRole } from '@/interfaces/user-type.inteface';
import { faker } from '@faker-js/faker';
import { Model, ModelObject } from 'objection';

export class UserType extends Model implements IUserType {
  public id: number;
  public uuid: string;
  public icon: string;
  public name: string;
  public description: string | null;
  public tag: UserRole;
  public createdAt: string;
  public updatedAt: string;

  public static idColumn = 'id';
  public static tableName = 'user_types';

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type UserTypeShape = ModelObject<UserType>;

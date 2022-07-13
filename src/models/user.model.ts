import { Model, ModelObject, RelationMappings } from 'objection';
import { IBaseUser } from '@/interfaces/user.interface';
import { UserType } from './user-type.model';
import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';

export class User extends Model implements IBaseUser {
  public id: number;
  public uuid: string;
  public email: string;
  public password: string | null;
  public firstName: string;
  public lastName: string;
  public createdAt: string;
  public updatedAt: string;

  public userTypeId: number;

  public static idColumn = 'id';
  public static tableName = 'users';

  public static relationMappings: RelationMappings = {
    userType: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserType,
      join: {
        from: 'users.user_type_id',
        to: 'user_types.id',
      },
    },
  };

  public async $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.password = await hash(this.password, 10);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type UserShape = ModelObject<User>;

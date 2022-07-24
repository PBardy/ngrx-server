import { IBaseUserLocation } from '@/interfaces/user-locations.interface';
import { faker } from '@faker-js/faker';
import { Model, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection';
import { Location } from './location.model';
import { User } from './user.model';

export class UserLocation extends Model implements IBaseUserLocation {
  public id: number;
  public uuid: string;
  public userId: number;
  public locationId: number;
  public createdAt: string;
  public updatedAt: string;

  public static idColumn = 'id';
  public static tableName = 'user_locations';

  public static relationMappings: RelationMappings | RelationMappingsThunk = {
    user: {
      modelClass: User,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'users.id',
        to: 'user_locations.user_id',
      },
    },
    location: {
      modelClass: Location,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'locations.id',
        to: 'user_locations.location_id',
      },
    },
  };

  public $beforeInsert() {
    this.uuid = faker.datatype.uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public $beforeUpdate(): void | Promise<any> {
    this.updatedAt = new Date().toISOString();
  }
}

export type UserLocationShape = ModelObject<UserLocation>;

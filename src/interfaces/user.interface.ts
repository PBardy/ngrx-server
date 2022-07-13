import { IModel } from './model.interface';
import { IUserType } from './user-type.inteface';

export interface IBaseUser extends IModel {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  userTypeId: number;
}

export interface IUser extends IBaseUser {
  userType?: IUserType;
}

import { ILocation } from './location.interface';
import { IModel } from './model.interface';
import { IUser } from './user.interface';

export interface IBaseUserLocation extends IModel {
  userId: number;
  locationId: number;
}

export interface IUserLocation extends IBaseUserLocation {
  user: IUser;
  location: ILocation;
}

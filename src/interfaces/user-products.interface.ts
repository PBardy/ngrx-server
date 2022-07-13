import { IModel } from './model.interface';
import { IProduct } from './product.interface';
import { IUser } from './user.interface';

export interface IBaseUserProduct extends IModel {
  userId: number;
  productId: number;
}

export interface IUserProduct extends IBaseUserProduct {
  user: IUser;
  product: IProduct;
}

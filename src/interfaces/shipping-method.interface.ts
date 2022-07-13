import { IModel } from './model.interface';

export interface IBaseShippingMethod extends IModel {
  name: string;
  slug: string;
  price: number;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IShippingMethod extends IBaseShippingMethod {}

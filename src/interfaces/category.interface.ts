import { IModel } from './model.interface';

export interface IBaseCategory extends IModel {
  name: string;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ICategory extends IBaseCategory {}

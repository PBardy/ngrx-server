import { IModel } from './model.interface';

export interface IBaseLocation extends IModel {
  name: string;
  description: string | null;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ILocation extends IBaseLocation {}

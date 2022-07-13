import { IModel } from './model.interface';

export interface IBaseTag extends IModel {
  name: string;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ITag extends IBaseTag {}

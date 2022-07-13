import { IModel } from './model.interface';

export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
}

export interface IBaseUserType extends IModel {
  tag: UserRole;
  icon: string;
  name: string;
  description: string | null;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IUserType extends IBaseUserType {}

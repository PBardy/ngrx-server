import { IUserModel } from '@/interfaces/model.interface';
import { bool } from 'envalid';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const canViewModel = (userId: number, model: IUserModel): boolean => {
  return model.userId === userId;
};

export const cannotViewModel = (userId: number, model: IUserModel): boolean => {
  return !canViewModel(userId, model);
};

export const canViewModels = (userId: number, models: Array<IUserModel>): boolean => {
  return models.every(model => canViewModel(userId, model));
};

export const cannotViewModels = (userId: number, models: Array<IUserModel>): boolean => {
  return !canViewModels(userId, models);
};

export function randomChoice<T>(choices: Array<T>): T {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

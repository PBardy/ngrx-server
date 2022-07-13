export interface IModel {
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserModel extends IModel {
  userId: number;
}

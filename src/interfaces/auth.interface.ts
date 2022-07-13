import { Request } from 'express';
import { IUser } from '@/interfaces/user.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: IUser;
}

export enum SignOutReason {
  SESSION_TIME_OUT = 'SESSION_TIME_OUT',
}

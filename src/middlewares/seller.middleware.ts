import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserRole } from '@/interfaces/user-type.inteface';
import { IUser } from '@/interfaces/user.interface';
import { User } from '@/models/user.model';
import { logger } from '@/utils/logger';
import { NextFunction, Response } from 'express';

const sellerMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.user.id);
    const user: IUser = await User.query().withGraphJoined('userType').findById(userId).skipUndefined();
    if (user) {
      if (user.userType && user.userType.tag === UserRole.SELLER) {
        next();
      } else {
        next(new HttpException(403, 'Forbidden'));
      }
    } else {
      next(new HttpException(404, 'Could not find user'));
    }
  } catch (error) {
    logger.debug(error);
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default sellerMiddleware;

import { UserProductDto } from '@/dtos/user-product/user-product.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserProductsService } from '@/services/user-products.service';
import { NextFunction, Response } from 'express';

export class UserProductsController {
  private readonly userProductsService = new UserProductsService();

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const data = await this.userProductsService.getOne(userId, uuid);
      const response: ApiResponse<UserProductDto> = {
        data: UserProductDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const data = await this.userProductsService.getAll(userId);
      const response: ApiResponse<Array<UserProductDto>> = {
        data: UserProductDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

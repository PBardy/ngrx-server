import { CreateShoppingListItemsDto } from '@/dtos/shopping-list-item/create-shopping-list-item.dto';
import { ShoppingListDto } from '@/dtos/shopping-list/shopping-list.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ApiResponse } from '@/interfaces/api.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ShoppingListItemService } from '@/services/shopping-list-item.service';
import { ShoppingListService } from '@/services/shopping-lists.service';
import { NextFunction, Response } from 'express';

export class ShoppingListItemController {
  private readonly shoppingListService = new ShoppingListService();
  private readonly shoppingListItemService = new ShoppingListItemService();

  public createOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const productId = String(req.params.productId);
      const shoppingListId = String(req.params.shoppingListId);
      await this.shoppingListItemService.createOne(userId, shoppingListId, productId);
      const data = await this.shoppingListService.getOne(userId, shoppingListId);
      const response: ApiResponse<ShoppingListDto> = {
        data: ShoppingListDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      if (e instanceof HttpException) {
        const response: ApiResponse<null> = {
          data: null,
          message: e.message,
        };

        return res.status(e.status).json(response);
      }

      next(e);
    }
  };

  public createMany = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const body = req.body as CreateShoppingListItemsDto;
      const shoppingListId = String(req.params.shoppingListId);
      await this.shoppingListItemService.createMany(userId, shoppingListId, body);
      const data = await this.shoppingListService.getOne(userId, shoppingListId);
      const response: ApiResponse<ShoppingListDto> = {
        data: ShoppingListDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      if (e instanceof HttpException) {
        const response: ApiResponse<null> = {
          data: null,
          message: e.message,
        };

        return res.status(e.status).json(response);
      }

      next(e);
    }
  };
}

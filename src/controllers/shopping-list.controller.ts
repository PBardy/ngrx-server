import { CreateShoppingListDto } from '@/dtos/shopping-list/create-shopping-list.dto';
import { DeleteShoppingListsDto } from '@/dtos/shopping-list/delete-shopping-lists.dto';
import { DuplicateShoppingListsDto } from '@/dtos/shopping-list/duplicate-shopping-lists.dto';
import { PatchShoppingListDto } from '@/dtos/shopping-list/patch-shopping-list.dto';
import { ShoppingListDto } from '@/dtos/shopping-list/shopping-list.dto';
import { UpdateShoppingListDto } from '@/dtos/shopping-list/update-shopping-list.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ApiResponse } from '@/interfaces/api.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ShoppingListService } from '@/services/shopping-lists.service';
import { NextFunction, Response } from 'express';

export class ShoppingListController {
  private readonly shoppingListsService = new ShoppingListService();

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const data = await this.shoppingListsService.getOne(userId, uuid);
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

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const data = await this.shoppingListsService.getAll(userId);
      const response: ApiResponse<Array<ShoppingListDto>> = {
        data: ShoppingListDto.fromModels(data),
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

  public createOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const body = req.body as CreateShoppingListDto;
      const data = await this.shoppingListsService.createOne(userId, body);
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

  public updateOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const body = req.body as UpdateShoppingListDto;
      const data = await this.shoppingListsService.updateOne(userId, uuid, body);
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

  public patchOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const body = req.body as PatchShoppingListDto;
      const data = await this.shoppingListsService.patchOne(userId, uuid, body);
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

  public deleteOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const data = await this.shoppingListsService.deleteOne(userId, uuid);
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

  public deleteMany = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const body = req.body as DeleteShoppingListsDto;
      const data = await this.shoppingListsService.deleteMany(userId, body);
      const response: ApiResponse<Array<ShoppingListDto>> = {
        data: ShoppingListDto.fromModels(data),
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

  public duplicateOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const data = await this.shoppingListsService.duplicateOne(userId, uuid);
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

  public duplicateMany = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const body = req.body as DuplicateShoppingListsDto;
      const data = await this.shoppingListsService.duplicateMany(userId, body);
      const response: ApiResponse<Array<ShoppingListDto>> = {
        data: ShoppingListDto.fromModels(data),
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

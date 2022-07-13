import { CategoryDto } from '@/dtos/category/category.dto';
import { CreateCategoryDto } from '@/dtos/category/create-category.dto';
import { PatchCategoryDto } from '@/dtos/category/patch-category.dto';
import { UpdateCategoryDto } from '@/dtos/category/update-category.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { CategoryService } from '@/services/category.service';
import { NextFunction, Request, Response } from 'express';

export class CategoriesController {
  private readonly categoryService = new CategoryService();

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const data = await this.categoryService.getOne(uuid);
      const response: ApiResponse<CategoryDto> = {
        data: CategoryDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.categoryService.getAll();
      const response: ApiResponse<Array<CategoryDto>> = {
        data: CategoryDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as CreateCategoryDto;
      const data = await this.categoryService.createOne(body);
      const response: ApiResponse<CategoryDto> = {
        data: CategoryDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const body = req.body as UpdateCategoryDto;
      const data = await this.categoryService.updateOne(uuid, body);
      const response: ApiResponse<CategoryDto> = {
        data: CategoryDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public patchOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const body = req.body as PatchCategoryDto;
      const data = await this.categoryService.patchOne(uuid, body);
      const response: ApiResponse<CategoryDto> = {
        data: CategoryDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const data = await this.categoryService.deleteOne(uuid);
      const response: ApiResponse<CategoryDto> = {
        data: CategoryDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

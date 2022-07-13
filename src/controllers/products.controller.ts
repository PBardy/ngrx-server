import { CreateProductDto } from '@/dtos/product/create-product.dto';
import { PatchProductDto } from '@/dtos/product/patch-product.dto';
import { ProductDto } from '@/dtos/product/product.dto';
import { UpdateProductDto } from '@/dtos/product/update-product.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { ProductService } from '@/services/product.service';
import { NextFunction, Request, Response } from 'express';

export class ProductsController {
  private readonly productsService = new ProductService();

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const data = await this.productsService.getOne(uuid);
      const response: ApiResponse<ProductDto> = {
        data: ProductDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.productsService.getAll();
      const response: ApiResponse<Array<ProductDto>> = {
        data: ProductDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as CreateProductDto;
      const data = await this.productsService.createOne(body);
      const response: ApiResponse<ProductDto> = {
        data: ProductDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const body = req.body as UpdateProductDto;
      const data = await this.productsService.updateOne(uuid, body);
      const response: ApiResponse<ProductDto> = {
        data: ProductDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public patchOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const body = req.body as PatchProductDto;
      const data = await this.productsService.patchOne(uuid, body);
      const response: ApiResponse<ProductDto> = {
        data: ProductDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const data = await this.productsService.deleteOne(uuid);
      const response: ApiResponse<ProductDto> = {
        data: ProductDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

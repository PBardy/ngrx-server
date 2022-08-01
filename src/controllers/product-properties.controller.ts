import { ProductPropertyDto } from '@/dtos/product-property/product-property.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { ProductPropertiesService } from '@/services/product-properties.service';
import { NextFunction, Request, Response } from 'express';

export class ProductPropertiesController {
  private readonly productPropertiesServie = new ProductPropertiesService();

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const data = await this.productPropertiesServie.getOne(uuid);
      const response: ApiResponse<ProductPropertyDto> = {
        data: ProductPropertyDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.productPropertiesServie.getAll();
      const response: ApiResponse<Array<ProductPropertyDto>> = {
        data: ProductPropertyDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

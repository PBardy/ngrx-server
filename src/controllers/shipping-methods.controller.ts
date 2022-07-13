import { ShippingMethodDto } from '@/dtos/shipping-method/shipping-method.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ShippingMethodsService } from '@/services/shipping-methods.service';
import { NextFunction, Response } from 'express';

export class ShippingMethodsController {
  private shippingMethodsService = new ShippingMethodsService();

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const data = await this.shippingMethodsService.getOne(uuid);
      const response: ApiResponse<ShippingMethodDto> = {
        data: ShippingMethodDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data = await this.shippingMethodsService.getAll();
      const response: ApiResponse<Array<ShippingMethodDto>> = {
        data: ShippingMethodDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

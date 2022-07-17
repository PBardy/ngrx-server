import { CartCheckoutDto } from '@/dtos/cart/cart-checkout.dto';
import { UserProductDto } from '@/dtos/user-product/user-product.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CartService } from '@/services/cart.service';
import { NextFunction, Request, Response } from 'express-serve-static-core';

export class CartController {
  private readonly cartService = new CartService();

  public checkout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const body = req.body as CartCheckoutDto;
      const data = await this.cartService.checkout(userId, body);
      const response: ApiResponse<Array<UserProductDto>> = {
        data: UserProductDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

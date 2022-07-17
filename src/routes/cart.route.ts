import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CartCheckoutDto } from '@/dtos/cart/cart-checkout.dto';
import { CartController } from '@/controllers/cart.controller';

class CartRoute implements Routes {
  public path = '/api/cart';
  public router = Router();
  public cartController = new CartController();

  public constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/checkout`, authMiddleware, validationMiddleware(CartCheckoutDto, 'body'), this.cartController.checkout);
  }
}

export default CartRoute;

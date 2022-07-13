import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ShippingMethodsController } from '@/controllers/shipping-methods.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class ShippingMethodsRoute implements Routes {
  public path = '/api/shipping-methods';
  public router = Router();
  public shippingMethodsController = new ShippingMethodsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.shippingMethodsController.getAll);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.shippingMethodsController.getOne);
  }
}

export default ShippingMethodsRoute;

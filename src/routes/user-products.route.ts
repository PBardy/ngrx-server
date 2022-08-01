import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import authMiddleware from '@/middlewares/auth.middleware';
import { UserProductsController } from '@/controllers/user-products.controller';

class UserProductsRoute implements Routes {
  public path = '/api/user/products';
  public router = Router();
  public userProductsController = new UserProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.userProductsController.getOne);
    this.router.get(`${this.path}`, authMiddleware, this.userProductsController.getAll);
  }
}

export default UserProductsRoute;

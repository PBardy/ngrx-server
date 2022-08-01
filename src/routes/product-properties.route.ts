import { ProductPropertiesController } from '@/controllers/product-properties.controller';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

class ProductPropertiesRoute implements Routes {
  public path = '/api/products/properties';
  public router = Router();
  public productPropertiesController = new ProductPropertiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.productPropertiesController.getAll);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.productPropertiesController.getOne);
  }
}

export default ProductPropertiesRoute;

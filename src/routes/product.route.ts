import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ProductsController } from '@/controllers/products.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateProductDto } from '@/dtos/product/create-product.dto';
import { PatchProductDto } from '@/dtos/product/patch-product.dto';
import { UpdateProductDto } from '@/dtos/product/update-product.dto';

class ProductsRoute implements Routes {
  public path = '/api/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.productsController.getAll);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.productsController.getOne);
    this.router.get(`${this.path}/`, authMiddleware, validationMiddleware(CreateProductDto, 'body'), this.productsController.createOne);
    this.router.get(`${this.path}/:uuid`, authMiddleware, validationMiddleware(PatchProductDto, 'body'), this.productsController.patchOne);
    this.router.get(`${this.path}/:uuid`, authMiddleware, validationMiddleware(UpdateProductDto, 'body'), this.productsController.updateOne);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.productsController.deleteOne);
  }
}

export default ProductsRoute;

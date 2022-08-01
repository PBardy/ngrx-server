import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ProductsController } from '@/controllers/products.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateProductDto } from '@/dtos/product/create-product.dto';
import { PatchProductDto } from '@/dtos/product/patch-product.dto';
import { UpdateProductDto } from '@/dtos/product/update-product.dto';
import sellerMiddleware from '@/middlewares/seller.middleware';

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

    this.router.post(
      `${this.path}/`,
      authMiddleware,
      sellerMiddleware,
      validationMiddleware(CreateProductDto, 'body'),
      this.productsController.createOne,
    );

    this.router.patch(
      `${this.path}/:uuid`,
      authMiddleware,
      sellerMiddleware,
      validationMiddleware(PatchProductDto, 'body'),
      this.productsController.patchOne,
    );

    this.router.put(
      `${this.path}/:uuid`,
      authMiddleware,
      sellerMiddleware,
      validationMiddleware(UpdateProductDto, 'body'),
      this.productsController.updateOne,
    );

    this.router.delete(`${this.path}/:uuid`, authMiddleware, sellerMiddleware, this.productsController.deleteOne);
  }
}

export default ProductsRoute;

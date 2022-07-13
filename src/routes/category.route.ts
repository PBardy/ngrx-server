import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CategoriesController } from '@/controllers/category.controller';
import { CreateCategoryDto } from '@/dtos/category/create-category.dto';
import { PatchCategoryDto } from '@/dtos/category/patch-category.dto';
import { UpdateCategoryDto } from '@/dtos/category/update-category.dto';

class CategoriesRoute implements Routes {
  public path = '/api/categories';
  public router = Router();
  public categoriesController = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.categoriesController.getAll);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.categoriesController.getOne);
    this.router.get(`${this.path}/`, authMiddleware, validationMiddleware(CreateCategoryDto, 'body'), this.categoriesController.createOne);
    this.router.get(`${this.path}/:uuid`, authMiddleware, validationMiddleware(PatchCategoryDto, 'body'), this.categoriesController.patchOne);
    this.router.get(`${this.path}/:uuid`, authMiddleware, validationMiddleware(UpdateCategoryDto, 'body'), this.categoriesController.updateOne);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.categoriesController.deleteOne);
  }
}

export default CategoriesRoute;

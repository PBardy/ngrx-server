import { ShoppingListController } from '@/controllers/shopping-list.controller';
import { CreateShoppingListDto } from '@/dtos/shopping-list/create-shopping-list.dto';
import { DeleteShoppingListsDto } from '@/dtos/shopping-list/delete-shopping-lists.dto';
import { DuplicateShoppingListsDto } from '@/dtos/shopping-list/duplicate-shopping-lists.dto';
import { PatchShoppingListDto } from '@/dtos/shopping-list/patch-shopping-list.dto';
import { UpdateShoppingListDto } from '@/dtos/shopping-list/update-shopping-list.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class ShoppingListsRoute implements Routes {
  public path = '/api/user/shopping-lists';
  public router = Router();
  public shoppingListsController = new ShoppingListController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.shoppingListsController.getAll);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.shoppingListsController.getOne);
    this.router.post(`${this.path}/`, authMiddleware, validationMiddleware(CreateShoppingListDto, 'body'), this.shoppingListsController.createOne);
    this.router.post(
      `${this.path}/copy`,
      authMiddleware,
      validationMiddleware(DuplicateShoppingListsDto, 'body'),
      this.shoppingListsController.duplicateMany,
    );
    this.router.post(
      `${this.path}/delete`,
      authMiddleware,
      validationMiddleware(DeleteShoppingListsDto, 'body'),
      this.shoppingListsController.deleteMany,
    );
    this.router.post(`${this.path}/:uuid/copy`, authMiddleware, this.shoppingListsController.duplicateOne);
    this.router.patch(
      `${this.path}/:uuid`,
      authMiddleware,
      validationMiddleware(PatchShoppingListDto, 'body'),
      this.shoppingListsController.patchOne,
    );
    this.router.put(
      `${this.path}/:uuid`,
      authMiddleware,
      validationMiddleware(UpdateShoppingListDto, 'body'),
      this.shoppingListsController.updateOne,
    );
    this.router.delete(`${this.path}/:uuid`, authMiddleware, this.shoppingListsController.deleteOne);
  }
}

export default ShoppingListsRoute;

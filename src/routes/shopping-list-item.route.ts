import { ShoppingListItemController } from '@/controllers/shopping-list-item.controller';
import { CreateShoppingListItemsDto } from '@/dtos/shopping-list-item/create-shopping-list-item.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class ShoppingListItemsRoute implements Routes {
  public path = '/api/user/shopping-lists/:shoppingListId/items';
  public router = Router();
  public shoppingListItemController = new ShoppingListItemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/add/:productId`, authMiddleware, this.shoppingListItemController.createOne);

    this.router.post(
      `${this.path}/add`,
      authMiddleware,
      validationMiddleware(CreateShoppingListItemsDto, 'body'),
      this.shoppingListItemController.createMany,
    );
  }
}

export default ShoppingListItemsRoute;

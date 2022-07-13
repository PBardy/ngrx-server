import { UserProductsService } from '@/services/user-products.service';

export class UserProductsController {
  private readonly userProductsService = new UserProductsService();
}

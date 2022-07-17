import { CartCheckoutDto } from '@/dtos/cart/cart-checkout.dto';
import { IUserProduct } from '@/interfaces/user-products.interface';
import { UserProductsService } from './user-products.service';

export class CartService {
  private readonly userProductsService = new UserProductsService();

  public async checkout(userId: number, dto: CartCheckoutDto): Promise<Array<IUserProduct>> {
    // TODO: use the promo code and shipping methods
    return this.userProductsService.createMany(userId, dto.productIds);
  }
}

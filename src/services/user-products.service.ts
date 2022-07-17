import { HttpException } from '@/exceptions/HttpException';
import { IUserProduct } from '@/interfaces/user-products.interface';
import { Product } from '@/models/product.model';
import { UserProduct } from '@/models/user-product.model';
import { User } from '@/models/user.model';
import { isEmpty } from 'class-validator';
import { ProductService } from './product.service';

export class UserProductsService {
  private readonly productService = new ProductService();

  public async createOne(userId: number, productId: string): Promise<IUserProduct> {
    const product = await Product.query().where('uuid', productId).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Cannot find product');
    }

    const user = await User.query().findById(userId);
    if (isEmpty(user)) {
      throw new HttpException(404, 'Cannot find user');
    }

    const userProduct = await UserProduct.query()
      .withGraphJoined('user')
      .withGraphJoined('product')
      .insertAndFetch({
        userId: user.id,
        productId: product.id,
      })
      .skipUndefined();

    return userProduct as unknown as IUserProduct;
  }

  public async createMany(userId: number, productsIds: Array<string>): Promise<Array<IUserProduct>> {
    return await Promise.all(productsIds.map(productId => this.createOne(userId, productId)));
  }
}

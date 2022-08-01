import { HttpException } from '@/exceptions/HttpException';
import { IProductProperty } from '@/interfaces/product.interface';
import { ProductProperty } from '@/models/product-property.model';
import { isEmpty } from 'class-validator';

export class ProductPropertiesService {
  public async getOne(uuid: string): Promise<IProductProperty> {
    const productProperty = await ProductProperty.query().where('uuid', uuid).first();
    if (isEmpty(productProperty)) {
      throw new HttpException(404, 'Could not find product property');
    }

    return productProperty as unknown as IProductProperty;
  }

  public async getAll(): Promise<Array<IProductProperty>> {
    const productProperty = await ProductProperty.query().select();
    return productProperty as unknown as Array<IProductProperty>;
  }
}

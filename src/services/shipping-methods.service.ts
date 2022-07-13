import { HttpException } from '@/exceptions/HttpException';
import { IShippingMethod } from '@/interfaces/shipping-method.interface';
import { ShippingMethod } from '@/models/shipping-method.model';
import { isEmpty } from 'class-validator';

export class ShippingMethodsService {
  public async getAll(): Promise<Array<IShippingMethod>> {
    return await ShippingMethod.query().select();
  }

  public async getOne(uuid: string): Promise<IShippingMethod> {
    const shippingMethod = await ShippingMethod.query().where('uuid', uuid).first();
    if (isEmpty(shippingMethod)) {
      throw new HttpException(404, 'Could not find shipping method');
    }

    return shippingMethod;
  }
}

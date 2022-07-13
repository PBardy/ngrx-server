import { CreateProductDto } from '@/dtos/product/create-product.dto';
import { PatchProductDto } from '@/dtos/product/patch-product.dto';
import { UpdateProductDto } from '@/dtos/product/update-product.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IProduct } from '@/interfaces/product.interface';
import { Product } from '@/models/product.model';
import { isEmpty } from 'class-validator';

export class ProductService {
  public async getAll(): Promise<Array<IProduct>> {
    return await Product.query().select();
  }

  public async getOne(uuid: string): Promise<IProduct> {
    const product = await Product.query().where('uuid', uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product');
    }

    return product;
  }

  public async createOne(dto: CreateProductDto): Promise<IProduct> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    return await Product.query().insertAndFetch(dto);
  }

  public async updateOne(uuid: string, dto: UpdateProductDto): Promise<IProduct> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    const product = await Product.query().where('uuid', uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product');
    }

    return await product.$query().updateAndFetch(dto);
  }

  public async patchOne(uuid: string, dto: PatchProductDto): Promise<IProduct> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    const product = await Product.query().where('uuid', uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product');
    }

    return await product.$query().patchAndFetch(dto);
  }

  public async deleteOne(uuid: string): Promise<IProduct> {
    const product = await Product.query().where('uuid', uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product');
    }

    await product.$query().delete();

    return product;
  }
}

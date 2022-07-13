import { CreateCategoryDto } from '@/dtos/category/create-category.dto';
import { PatchCategoryDto } from '@/dtos/category/patch-category.dto';
import { UpdateCategoryDto } from '@/dtos/category/update-category.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ICategory } from '@/interfaces/category.interface';
import { Category } from '@/models/category.model';

import { isEmpty } from 'class-validator';

export class CategoryService {
  public async getAll(): Promise<Array<ICategory>> {
    return await Category.query().select();
  }

  public async getOne(uuid: string): Promise<ICategory> {
    const category = await Category.query().where('uuid', uuid).first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Could not find category');
    }

    return category;
  }

  public async createOne(dto: CreateCategoryDto): Promise<ICategory> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    return await Category.query().insertAndFetch(dto);
  }

  public async updateOne(uuid: string, dto: UpdateCategoryDto): Promise<ICategory> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    const category = await Category.query().where('uuid', uuid).first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Could not find Category');
    }

    return await category.$query().updateAndFetch(dto);
  }

  public async patchOne(uuid: string, dto: PatchCategoryDto): Promise<ICategory> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    const category = await Category.query().where('uuid', uuid).first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Could not find Category');
    }

    return await category.$query().patchAndFetch(dto);
  }

  public async deleteOne(uuid: string): Promise<ICategory> {
    const category = await Category.query().where('uuid', uuid).first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Could not find Category');
    }

    await category.$query().delete();

    return category;
  }
}

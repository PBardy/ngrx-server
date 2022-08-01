import { ICategory } from './category.interface';
import { IModel } from './model.interface';
import { ITag } from './tag.interface';

export enum ProductAvailability {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

export interface IBaseProduct extends IModel {
  code: string;
  slug: string;
  name: string;
  image: string;
  description?: string;
  price: number;
  availability: ProductAvailability;
}

export interface IProduct extends IBaseProduct {
  tags?: ITag[];
  categories?: ICategory[];
}

export interface IBaseProductProperty extends IModel {
  tag: Uppercase<string>;
  label: string;
  categoryId: number;
}

export interface IProductProperty extends IBaseProductProperty {
  category: IProductPropertyCategory;
}

export interface IProductPropertyCategory extends IModel {
  tag: Uppercase<string>;
  label: string;
}

export interface IBaseProductProperties extends IModel {
  productId: number;
  productPropertyId: number;
  value: string | boolean | number | null;
}

export interface IProductProperties extends IBaseProductProperties {
  product: IProduct;
  productProperty: IProductProperty;
}

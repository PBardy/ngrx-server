import { IsObject } from 'class-validator';
import { ProductDto } from '../product/product.dto';
import { UserDTO } from '../user/user.dto';

export class CreateUserProductDto {
  @IsObject()
  public readonly user: UserDTO;

  @IsObject()
  public readonly product: ProductDto;
}

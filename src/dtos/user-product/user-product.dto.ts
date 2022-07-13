import { IUserProduct } from '@/interfaces/user-products.interface';
import { IsUUID, ValidateNested } from 'class-validator';
import { ProductDto } from '../product/product.dto';
import { UserDTO } from '../user/user.dto';

export class UserProductDto {
  @IsUUID()
  public readonly uuid: string;

  @ValidateNested()
  public readonly user: UserDTO;

  @ValidateNested()
  public readonly product: ProductDto;

  public constructor(uuid: string, user: UserDTO, product: ProductDto) {
    this.uuid = uuid;
    this.user = user;
    this.product = product;
  }

  public static fromModel({ uuid, user, product }: IUserProduct): UserProductDto {
    return new UserProductDto(uuid, UserDTO.fromModel(user), ProductDto.fromModel(product));
  }

  public static fromModels(models: Array<IUserProduct>): Array<UserProductDto> {
    return models.map(UserProductDto.fromModel);
  }
}

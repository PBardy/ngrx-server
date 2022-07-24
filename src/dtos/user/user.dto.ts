import { IUser } from '@/interfaces/user.interface';
import { IsEmail, IsObject, IsString, IsUUID } from 'class-validator';
import { UserTypeDTO } from './user-type.dto';

export class UserDTO {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsEmail()
  public readonly email: string;

  @IsObject()
  public readonly userType: UserTypeDTO;

  public constructor(user: IUser) {
    this.uuid = user.uuid;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.userType = UserTypeDTO.fromModel(user.userType);
  }

  public static fromModel(user: IUser): UserDTO {
    return new UserDTO(user);
  }

  public static fromModels(models: Array<IUser>): Array<UserDTO> {
    return models.map(UserDTO.fromModel);
  }
}

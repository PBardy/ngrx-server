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

  public constructor(uuid: string, firstName: string, lastName: string, email: string, userType: UserTypeDTO) {
    this.uuid = uuid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userType = userType;
  }

  public static fromModel({ uuid, firstName, lastName, email, userType }: IUser): UserDTO {
    return new UserDTO(uuid, firstName, lastName, email, UserTypeDTO.fromModel(userType));
  }

  public static fromModels(models: Array<IUser>): Array<UserDTO> {
    return models.map(UserDTO.fromModel);
  }
}

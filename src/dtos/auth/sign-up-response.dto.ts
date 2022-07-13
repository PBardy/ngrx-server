import { IsObject, IsString } from 'class-validator';
import { UserDTO } from '../user/user.dto';

export class SignUpResponseDTO {
  @IsObject()
  public readonly user: UserDTO;

  @IsString()
  public readonly token: string;

  public constructor(user: UserDTO, token: string) {
    this.user = user;
    this.token = token;
  }
}

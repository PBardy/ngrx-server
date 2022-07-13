import { IsEmail, IsString } from 'class-validator';

export class SignInRequestDTO {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

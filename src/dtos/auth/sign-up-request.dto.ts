import { UserRole } from '@/interfaces/user-type.inteface';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class SignUpRequestDTO {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsEnum(UserRole, { each: true })
  public readonly userType: UserRole;
}

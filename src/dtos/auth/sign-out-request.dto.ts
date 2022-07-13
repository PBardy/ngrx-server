import { SignOutReason } from '@/interfaces/auth.interface';
import { IsEnum } from 'class-validator';

export class SignOutRequestDTO {
  @IsEnum(SignOutReason, { each: true })
  public readonly reason: SignOutReason;
}

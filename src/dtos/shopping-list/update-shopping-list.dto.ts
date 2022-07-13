import { IsString } from 'class-validator';

export class UpdateShoppingListDto {
  @IsString()
  public readonly name: string;
}

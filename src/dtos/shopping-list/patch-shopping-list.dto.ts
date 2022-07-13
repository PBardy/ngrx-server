import { IsOptional, IsString } from 'class-validator';

export class PatchShoppingListDto {
  @IsOptional()
  @IsString()
  public readonly name: string;
}

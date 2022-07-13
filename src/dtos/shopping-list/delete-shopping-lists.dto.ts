import { IsArray } from 'class-validator';

export class DeleteShoppingListsDto {
  @IsArray()
  public readonly uuids: Array<string>;
}

import { IsArray } from 'class-validator';

export class DuplicateShoppingListsDto {
  @IsArray()
  public readonly uuids: Array<string>;
}

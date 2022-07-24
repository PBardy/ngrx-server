import { IsArray } from 'class-validator';

export class DeleteUserLocationsDto {
  @IsArray()
  public readonly uuids: Array<string>;
}

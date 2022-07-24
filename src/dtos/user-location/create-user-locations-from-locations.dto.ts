import { IsArray } from 'class-validator';

export class CreateUserLocationsFromLocationsDto {
  @IsArray()
  public locationIds: Array<string>;
}

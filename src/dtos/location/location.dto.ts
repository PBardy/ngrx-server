import { ILocation } from '@/interfaces/location.interface';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class LocationDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly name: string;

  @IsOptional()
  @IsString()
  public readonly description: string | null;

  public constructor(uuid: string, name: string, description: string | null) {
    this.uuid = uuid;
    this.name = name;
    this.description = description;
  }

  public static fromModel({ uuid, name, description }: ILocation): LocationDto {
    return new LocationDto(uuid, name, description);
  }

  public static fromModels(models: Array<ILocation>): Array<LocationDto> {
    return models.map(LocationDto.fromModel);
  }
}

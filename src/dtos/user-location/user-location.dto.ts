import { IUserLocation } from '@/interfaces/user-locations.interface';
import { IsUUID, ValidateNested } from 'class-validator';
import { LocationDto } from '../location/location.dto';
import { UserDTO } from '../user/user.dto';

export class UserLocationDto {
  @IsUUID()
  public readonly uuid: string;

  @ValidateNested()
  public readonly user: UserDTO;

  @ValidateNested()
  public readonly location: LocationDto;

  public constructor(userLocation: IUserLocation) {
    this.uuid = userLocation.uuid;
    this.user = UserDTO.fromModel(userLocation.user);
    this.location = LocationDto.fromModel(userLocation.location);
  }

  public static fromModel(userLocation: IUserLocation): UserLocationDto {
    return new UserLocationDto(userLocation);
  }

  public static fromModels(models: Array<IUserLocation>): Array<UserLocationDto> {
    return models.map(UserLocationDto.fromModel);
  }
}

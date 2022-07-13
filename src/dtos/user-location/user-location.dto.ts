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

  public constructor(uuid: string, user: UserDTO, location: LocationDto) {
    this.uuid = uuid;
    this.user = user;
    this.location = location;
  }

  public static fromModel({ uuid, user, location }: IUserLocation): UserLocationDto {
    return new UserLocationDto(uuid, UserDTO.fromModel(user), LocationDto.fromModel(location));
  }

  public static fromModels(models: Array<IUserLocation>): Array<UserLocationDto> {
    return models.map(UserLocationDto.fromModel);
  }
}

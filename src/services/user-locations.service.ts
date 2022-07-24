import { CreateLocationDto } from '@/dtos/location/create-location.dto';
import { CreateUserLocationDto } from '@/dtos/user-location/create-user-location.dto';
import { CreateUserLocationsFromLocationsDto } from '@/dtos/user-location/create-user-locations-from-locations.dto';
import { DeleteUserLocationsDto } from '@/dtos/user-location/delete-user-locations.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ILocation } from '@/interfaces/location.interface';
import { IUserLocation } from '@/interfaces/user-locations.interface';
import { Location } from '@/models/location.model';
import { UserLocation } from '@/models/user-location.model';
import { User } from '@/models/user.model';
import { cannotViewModel } from '@/utils/util';
import { isEmpty } from 'class-validator';
import { LocationSservice } from './location.service';

export class UserLocationsService {
  private readonly locationService = new LocationSservice();

  public async getAll(userId: number): Promise<Array<IUserLocation>> {
    const userLocations = await UserLocation.query()
      .where('userId', userId)
      .withGraphJoined('user')
      .withGraphJoined('user.userType')
      .withGraphJoined('location');

    return userLocations as unknown as Array<IUserLocation>;
  }

  public async getOne(userId: number, uuid: string): Promise<IUserLocation> {
    const userLocation = await UserLocation.query()
      .where('uuid', uuid)
      .withGraphJoined('user')
      .withGraphJoined('user.userType')
      .withGraphJoined('location')
      .first();

    if (isEmpty(userLocation)) {
      throw new HttpException(404, 'Could not find user location');
    }

    if (cannotViewModel(userId, userLocation)) {
      throw new HttpException(403, 'You cannot view this user location');
    }

    return userLocation as unknown as IUserLocation;
  }

  public async createOne(userId: number, dto: CreateUserLocationDto): Promise<IUserLocation> {
    // Get user for validation
    const user = await User.query().findById(userId);
    if (isEmpty(user)) {
      throw new HttpException(403, 'Forbidden');
    }

    // Create location from dto
    const createLocationDto = new CreateLocationDto({
      name: dto.name,
      description: dto.description,
    });

    // Attempt to create location using this data
    const location = await this.locationService.createOne(user.id, createLocationDto);
    const userLocation = await this.createFromLocation(user.id, location.uuid);

    return userLocation;
  }

  public async deleteOne(userId: number, uuid: string): Promise<IUserLocation> {
    // Get user for validation
    const user = await User.query().findById(userId);
    if (isEmpty(user)) {
      throw new HttpException(403, 'Forbidden');
    }

    // Get user location
    const userLocation = await UserLocation.query()
      .where('user_locations.uuid', uuid)
      .withGraphJoined('user')
      .withGraphJoined('user.userType')
      .withGraphJoined('location')
      .skipUndefined()
      .first();

    // Check viewing permissions
    if (cannotViewModel(user.id, userLocation)) {
      throw new HttpException(403, 'Forbidden');
    }

    // Otherwise delete model
    await userLocation.$query().delete();

    return userLocation as unknown as IUserLocation;
  }

  public async deleteMany(userId: number, dto: DeleteUserLocationsDto): Promise<Array<IUserLocation>> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    return await Promise.all(dto.uuids.map(userLocationId => this.deleteOne(userId, userLocationId)));
  }

  public async getAutoSuggestions(userId: number): Promise<Array<ILocation>> {
    // Get user for validation
    const user = await User.query().findById(userId);
    if (isEmpty(user)) {
      throw new HttpException(403, 'Forbidden');
    }

    // Get user locations
    const userLocations = await UserLocation.query().where('userId', user.id);
    const userLocationIds = userLocations.map(userLocation => userLocation.locationId);

    // Get top locations not currently linked to the user
    const locations = await Location.query().whereNotIn('id', userLocationIds).limit(10);

    return locations;
  }

  public async createFromLocation(userId: number, locationId: string): Promise<IUserLocation> {
    // Get user for validation
    const user = await User.query().findById(userId);
    if (isEmpty(user)) {
      throw new HttpException(403, 'Forbidden');
    }

    // Get location
    const location = await Location.query().where('uuid', locationId).first();
    if (isEmpty(location)) {
      throw new HttpException(404, 'Could not find location to add');
    }

    // Create link and return
    const userLocation = await UserLocation.query().insertAndFetch({ userId: user.id, locationId: location.id }).skipUndefined();
    const userLocationWithRelations = await UserLocation.query()
      .withGraphJoined('user')
      .withGraphJoined('user.userType')
      .withGraphJoined('location')
      .findById(userLocation.id);

    return userLocationWithRelations as unknown as IUserLocation;
  }

  public async createFromLocations(userId: number, dto: CreateUserLocationsFromLocationsDto) {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Missing location ids');
    }

    return await Promise.all(dto.locationIds.map(locationId => this.createFromLocation(userId, locationId)));
  }
}

import { HttpException } from '@/exceptions/HttpException';
import { IUserLocation } from '@/interfaces/user-locations.interface';
import { UserLocation } from '@/models/user-location.model';
import { isEmpty } from 'class-validator';

export class UserLocationsService {
  public async getAll(userId: number): Promise<Array<IUserLocation>> {
    const userLocations = await UserLocation.query().where('userId', userId).withGraphJoined('user').withGraphJoined('location');
    return userLocations as unknown as Array<IUserLocation>;
  }

  public async getOne(userId: number, uuid: string): Promise<IUserLocation> {
    const userLocation = await UserLocation.query().where('uuid', uuid).withGraphJoined('user').withGraphJoined('location').first();
    if (isEmpty(userLocation)) {
      throw new HttpException(404, 'Could not find user location');
    }

    if (userLocation.userId !== userId) {
      throw new HttpException(403, 'You cannot view this user location');
    }

    return userLocation as unknown as IUserLocation;
  }

  public async createOne(userId: number, locationId: string): Promise<IUserLocation> {}

  public async updateOne(userId: number, uuid: string, locationId: string): Promise<IUserLocation> {}

  public async patchOne(userId: number, uuid: string, locationId: string): Promise<IUserLocation> {}

  public async deleteOne(userId: number, uuid: string): Promise<IUserLocation> {}
}

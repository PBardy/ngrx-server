import { CreateLocationDto } from '@/dtos/location/create-location.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ILocation } from '@/interfaces/location.interface';
import { Location } from '@/models/location.model';
import { User } from '@/models/user.model';
import { isEmpty } from 'class-validator';

export class LocationSservice {
  public async createOne(userId: number, dto: CreateLocationDto): Promise<ILocation> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid location body');
    }

    // Get user for validation
    const user = await User.query().findById(userId);
    if (isEmpty(user)) {
      throw new HttpException(403, 'Forbidden');
    }

    // Create location
    const location = await Location.query().insertAndFetch({
      name: dto.name,
      description: dto.description,
    });

    return location as unknown as ILocation;
  }
}

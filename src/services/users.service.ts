import { UserType } from '@/models/user-type.model';

export class UserService {
  public async getTypes(): Promise<Array<UserType>> {
    return await UserType.query().select();
  }
}

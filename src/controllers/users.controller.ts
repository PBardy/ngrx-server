import { UserTypeDTO } from '@/dtos/user/user-type.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { UserService } from '@services/users.service';
import { NextFunction, Request, Response } from 'express';

class UsersController {
  public userService = new UserService();

  public getTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const models = await this.userService.getTypes();
      const data = UserTypeDTO.fromModels(models);
      const response: ApiResponse<Array<UserTypeDTO>> = {
        data,
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

export default UsersController;

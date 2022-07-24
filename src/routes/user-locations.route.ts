import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import { UserLocationsController } from '@/controllers/user-locations.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateUserLocationsFromLocationsDto } from '@/dtos/user-location/create-user-locations-from-locations.dto';
import { CreateUserLocationDto } from '@/dtos/user-location/create-user-location.dto';
import { DeleteUserLocationsDto } from '@/dtos/user-location/delete-user-locations.dto';

class UserLocationRoute implements Routes {
  public path = '/api/user/locations';
  public router = Router();
  public userLocationsController = new UserLocationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/auto-suggestions`, authMiddleware, this.userLocationsController.getAutoSuggestions);
    this.router.post(
      `${this.path}/auto-suggestions`,
      authMiddleware,
      validationMiddleware(CreateUserLocationsFromLocationsDto, 'body'),
      this.userLocationsController.createFromLocations,
    );
    this.router.get(`${this.path}`, authMiddleware, this.userLocationsController.getAll);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.userLocationsController.getOne);

    // Delete many
    this.router.post(
      `${this.path}/delete`,
      authMiddleware,
      validationMiddleware(DeleteUserLocationsDto, 'body'),
      this.userLocationsController.deleteMany,
    );

    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateUserLocationDto, 'body'), this.userLocationsController.createOne);
    this.router.delete(`${this.path}/:uuid`, authMiddleware, this.userLocationsController.deleteOne);
  }
}

export default UserLocationRoute;

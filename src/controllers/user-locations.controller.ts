import { LocationDto } from '@/dtos/location/location.dto';
import { CreateUserLocationDto } from '@/dtos/user-location/create-user-location.dto';
import { CreateUserLocationsFromLocationsDto } from '@/dtos/user-location/create-user-locations-from-locations.dto';
import { DeleteUserLocationsDto } from '@/dtos/user-location/delete-user-locations.dto';
import { UserLocationDto } from '@/dtos/user-location/user-location.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserLocationsService } from '@/services/user-locations.service';
import { logger } from '@/utils/logger';
import { NextFunction, Response } from 'express';

export class UserLocationsController {
  private readonly userLocationsService = new UserLocationsService();

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const userId = Number(req.user.id);
      const data = await this.userLocationsService.getOne(userId, uuid);
      const response: ApiResponse<UserLocationDto> = {
        data: UserLocationDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const data = await this.userLocationsService.getAll(userId);
      const response: ApiResponse<Array<UserLocationDto>> = {
        data: UserLocationDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public createOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const body = req.body as CreateUserLocationDto;
      const data = await this.userLocationsService.createOne(userId, body);
      const response: ApiResponse<UserLocationDto> = {
        data: UserLocationDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public deleteOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const data = await this.userLocationsService.deleteOne(userId, uuid);
      const response: ApiResponse<UserLocationDto> = {
        data: UserLocationDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public deleteMany = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const body = req.body as DeleteUserLocationsDto;
      const data = await this.userLocationsService.deleteMany(userId, body);
      const response: ApiResponse<Array<UserLocationDto>> = {
        data: UserLocationDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public getAutoSuggestions = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const data = await this.userLocationsService.getAutoSuggestions(userId);
      const response: ApiResponse<Array<LocationDto>> = {
        data: LocationDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public createFromLocations = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const body = req.body as CreateUserLocationsFromLocationsDto;
      const data = await this.userLocationsService.createFromLocations(userId, body);
      const response: ApiResponse<Array<UserLocationDto>> = {
        data: UserLocationDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

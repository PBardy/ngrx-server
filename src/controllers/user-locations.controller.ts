import { UserLocationDto } from '@/dtos/user-location/user-location.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserLocationsService } from '@/services/user-locations.service';
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
      const locationId = String(req.params.uuid);
      const data = await this.userLocationsService.createOne(userId, locationId);
      const response: ApiResponse<UserLocationDto> = {
        data: UserLocationDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public updateOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const locationId = String(req.params.uuid);
      const data = await this.userLocationsService.updateOne(userId, uuid, locationId);
      const response: ApiResponse<UserLocationDto> = {
        data: UserLocationDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public patchOne = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const locationId = String(req.params.uuid);
      const data = await this.userLocationsService.patchOne(userId, uuid, locationId);
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
}

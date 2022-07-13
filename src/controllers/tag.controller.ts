import { CreateTagDto } from '@/dtos/tag/create-tag.dto';
import { PatchTagDto } from '@/dtos/tag/patch-tag.dto';
import { TagDto } from '@/dtos/tag/tag.dto';
import { UpdateTagDto } from '@/dtos/tag/update-tag.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { TagService } from '@/services/tag.service';
import { NextFunction, Request, Response } from 'express';

export class TagController {
  private readonly tagService = new TagService();

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const data = await this.tagService.getOne(uuid);
      const response: ApiResponse<TagDto> = {
        data: TagDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tagService.getAll();
      const response: ApiResponse<Array<TagDto>> = {
        data: TagDto.fromModels(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as CreateTagDto;
      const data = await this.tagService.createOne(body);
      const response: ApiResponse<TagDto> = {
        data: TagDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const body = req.body as UpdateTagDto;
      const data = await this.tagService.updateOne(uuid, body);
      const response: ApiResponse<TagDto> = {
        data: TagDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public patchOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const body = req.body as PatchTagDto;
      const data = await this.tagService.patchOne(uuid, body);
      const response: ApiResponse<TagDto> = {
        data: TagDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uuid = String(req.params.uuid);
      const data = await this.tagService.deleteOne(uuid);
      const response: ApiResponse<TagDto> = {
        data: TagDto.fromModel(data),
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

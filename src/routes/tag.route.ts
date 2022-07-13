import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { TagController } from '@/controllers/tag.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateTagDto } from '@/dtos/tag/create-tag.dto';
import { PatchTagDto } from '@/dtos/tag/patch-tag.dto';
import { UpdateTagDto } from '@/dtos/tag/update-tag.dto';

class TagsRoute implements Routes {
  public path = '/api/tags';
  public router = Router();
  public tagController = new TagController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.tagController.getAll);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.tagController.getOne);
    this.router.get(`${this.path}/`, authMiddleware, validationMiddleware(CreateTagDto, 'body'), this.tagController.createOne);
    this.router.get(`${this.path}/:uuid`, authMiddleware, validationMiddleware(PatchTagDto, 'body'), this.tagController.patchOne);
    this.router.get(`${this.path}/:uuid`, authMiddleware, validationMiddleware(UpdateTagDto, 'body'), this.tagController.updateOne);
    this.router.get(`${this.path}/:uuid`, authMiddleware, this.tagController.deleteOne);
  }
}

export default TagsRoute;

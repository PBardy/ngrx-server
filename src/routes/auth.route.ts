import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { SignInRequestDTO } from '@/dtos/auth/sign-in-request.dto';
import { SignUpRequestDTO } from '@/dtos/auth/sign-up-request.dto';
import { SignOutRequestDTO } from '@/dtos/auth/sign-out-request.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class AuthRoute implements Routes {
  public path = '/api/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/sign-in`, validationMiddleware(SignInRequestDTO, 'body'), this.authController.signIn);
    this.router.post(`${this.path}/sign-up`, validationMiddleware(SignUpRequestDTO, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/sign-out`, validationMiddleware(SignOutRequestDTO, 'body'), this.authController.signOut);
    this.router.get(`${this.path}/refresh-session`, authMiddleware, this.authController.refreshSession);
  }
}

export default AuthRoute;

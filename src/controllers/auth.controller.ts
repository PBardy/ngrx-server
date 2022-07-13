import { SignInRequestDTO } from '@/dtos/auth/sign-in-request.dto';
import { SignInResponseDTO } from '@/dtos/auth/sign-in-response.dto';
import { SignOutRequestDTO } from '@/dtos/auth/sign-out-request.dto';
import { SignUpRequestDTO } from '@/dtos/auth/sign-up-request.dto';
import { SignUpResponseDTO } from '@/dtos/auth/sign-up-response.dto';
import { ApiResponse } from '@/interfaces/api.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import AuthService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public readonly authService = new AuthService();

  public refreshSession = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.user.id);
      const data = await this.authService.refreshSession(id);
      const response: ApiResponse<SignInResponseDTO> = {
        data,
        message: 'Refreshed session successfully',
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as SignInRequestDTO;
      const data = await this.authService.signIn(body);
      const response: ApiResponse<SignInResponseDTO> = {
        data,
        message: 'Signed in successfully',
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as SignUpRequestDTO;
      const data = await this.authService.signUp(body);
      const response: ApiResponse<SignUpResponseDTO> = {
        data,
        message: 'Signed up successfully',
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };

  public signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as SignOutRequestDTO;
      const data = await this.authService.signOut(body);
      const response: ApiResponse<void> = {
        data,
        message: 'Signed out successfully',
      };

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  };
}

export default AuthController;

import { Request, Response, NextFunction } from "express";
import { IUserController } from "../../interface/user/IUserController";
import { IUserService } from "../../interface/user/IUserService";
import { HttpStatus } from "../../utils/httpsStatus";
import dotenv from 'dotenv';
dotenv.config();
export class UserController implements IUserController {
  constructor(private _userService: IUserService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const result = await this._userService.signup(name, email, password);
      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("login request is comming to back end ...");
      const { email, password } = req.body;

      const result = await this._userService.login(email, password);
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000,
      });
      console.log("Cookie Set AccessToken Done");
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000,
      });
      res.status(HttpStatus.OK).json(result.user);
    } catch (error) {
      next(error);
    }
  }
}

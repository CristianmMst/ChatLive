import "../middlewares/passport";
import { createToken } from "../utils/auth";
import { onlineUsers } from "../../../server";
import { User } from "../../../user/domain/User";
import { CLIENT_URL } from "../../../shared/const";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../application/AuthService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    try {
      const token = await this.authService.login(user);
      return res
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({ message: "Login successful" });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      onlineUsers.delete(req.params.id);
      return res.clearCookie("accessToken").send();
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    try {
      const user2 = await this.authService.register(user);
      return res.status(200).json({ message: "Register successful", user2 });
    } catch (error) {
      next(error);
    }
  };

  googleAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as User;
      if (user) {
        const token = createToken(user.id!);
        return res
          .cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .redirect(`${CLIENT_URL}/`);
      }
    } catch (error) {
      next(error);
    }
  };
}

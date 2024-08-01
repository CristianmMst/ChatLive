import { onlineUsers } from "../../../server";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../application/AuthService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const token = await this.authService.login(email, password);
      return res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
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
    const { email, username, password } = req.body;
    try {
      await this.authService.register(email, username, password);
      return res.status(200).json({ message: "Register successful" });
    } catch (error) {
      next(error);
    }
  };
}

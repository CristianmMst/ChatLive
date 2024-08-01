import { NextFunction, Request, Response } from "express";
import { UserService } from "../../application/UserService";
import { User } from "../../domain/User";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.user as User;
    try {
      const user = await this.userService.findById(data.id!);
      const userWithoutPassword = {
        id: user.id,
        email: user.email,
        username: user.username,
        password: undefined,
      };
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  };

  getContacts = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const users = await this.userService.getContacts(id);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  };
}

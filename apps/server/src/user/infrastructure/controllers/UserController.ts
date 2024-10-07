import fs from "node:fs";
import { User } from "../../domain/User";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../../application/UserService";
import cloudinary from "../../../message/infrastructure/config/cloudinary";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as User;
    try {
      const user = await this.userService.findById(id!);
      res.json(user);
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

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    let newUser = req.body;
    const { id } = req.user as User;
    try {
      if (req.file) {
        const uploadResponse = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        newUser = { ...newUser, avatar: uploadResponse.url };
      }
      const userUpdated = await this.userService.updateUser(id!, newUser);
      return res.json(userUpdated);
    } catch (error) {
      next(error);
    }
  };
}

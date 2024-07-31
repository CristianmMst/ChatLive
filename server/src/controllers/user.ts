import { User } from "../types/auth";
import UserModel from "../models/user";
import { NextFunction, Request, Response } from "express";

export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.params.id } });
    const newUsers = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
      };
    });
    res.json(newUsers);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as User;
    const userExists = await UserModel.findOne({ _id: user.id });
    if (!userExists) return res.status(404).json({ message: "User not found" });
    return res.json(userExists);
  } catch (error) {
    next(error);
  }
};

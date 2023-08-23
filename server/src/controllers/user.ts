import UserModel from "../models/user";
import { Request, Response } from "express";

export const getContacts = async (req: Request, res: Response) => {
  const users = await UserModel.find({ _id: { $ne: req.params.id } }).select([
    "username",
  ]);
  const newUsers = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
    };
  });
  res.json(newUsers);
};

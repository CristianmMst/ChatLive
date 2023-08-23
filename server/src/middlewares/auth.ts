import userModel from "../models/user";
import { verifyToken } from "../utils/auth";
import { NextFunction, Request, Response } from "express";

export const checkSession = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (token) {
    const user = verifyToken(token);
    const userData = await userModel.findOne({ _id: user.id });
    if (userData) {
      req.user = {
        id: userData._id,
        email: userData.email,
        username: userData.username,
      };
    }
  }
  next();
};

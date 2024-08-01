import { verifyToken } from "../utils/auth";
import { NextFunction, Response, Request } from "express";
import { userModel } from "../../../user/infrastructure/models/userModel";

export const checkSession = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;
  try {
    if (!token) throw new Error("Missing access token");
    const { id } = verifyToken(token);
    const user = await userModel.findOne({ _id: id });
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

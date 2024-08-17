import { verifyToken } from "../utils/auth";
import { NextFunction, Response, Request } from "express";
import { MissingToken } from "../../domain/exceptions/MissingToken";
import { userModel } from "../../../user/infrastructure/models/userModel";
import { UserNotFound } from "../../../user/domain/exceptions/UserNotFound";

export const checkSession = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;
  try {
    if (!token) throw new MissingToken();
    const { id } = verifyToken(token);
    const user = await userModel.findOne({ _id: id });
    if (!user) throw new UserNotFound();
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

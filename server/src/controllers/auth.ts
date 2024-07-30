import { onlineUsers } from "..";
import { NextFunction, Request, Response } from "express";
import * as authServices from "../services/auth";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const token = await authServices.loginUserLocal({ email, password });
    return res.cookie("accessToken", token).status(200).send();
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.body;
  try {
    const registerUser = await authServices.registerUserLocal(user);
    return res.send(registerUser);
  } catch (error) {
    next(error);
  }
};

export const loginFailed = async (_req: Request, res: Response) => {
  res.status(404).json({
    msg: "Login failed",
  });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    onlineUsers.delete(req.params.id);
    return res.clearCookie("accessToken").send();
  } catch (error) {
    next(error);
  }
};

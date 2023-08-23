import { onlineUsers } from "..";
import * as authServices from "../services/auth";
import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const loginUser = await authServices.loginUserLocal({ email, password });
    return res.send(loginUser);
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const registerUser = await authServices.registerUserLocal(user);
    return res.send(registerUser);
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  if (req.user) {
    res.json({
      user: req.user,
    });
  } else {
    return res.status(403).json({
      error: "Not authorized",
    });
  }
};

export const loginFailed = async (req: Request, res: Response) => {
  res.status(404).json({
    msg: "Login failed",
  });
};

export const logout = (req: Request, res: Response) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.send("Logout successfully");
  } catch (error) {
    console.log(error);
  }
};

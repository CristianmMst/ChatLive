import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof Error) console.log(err.message);
  return res.status(500).json({ message: err });
};

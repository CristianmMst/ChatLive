import path from "path";
import fs from "node:fs";
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";

export const resizeImage = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.file) return next();
  const filename = `${Date.now()}-${req.file.originalname}`;
  const filepath = path.join(__dirname, "../../../../uploads", filename);

  await sharp(req.file.path)
    .resize(1200)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(filepath);

  fs.unlink(req.file.path, (error) => {
    if (error) return console.log(`Error to delete ${req.file?.path}`, error);
  });

  req.file.filename = filename;
  req.file.path = filepath;

  next();
};

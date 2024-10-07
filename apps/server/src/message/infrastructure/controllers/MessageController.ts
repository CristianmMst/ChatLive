import fs from "node:fs";
import cloudinary from "../config/cloudinary";
import { NextFunction, Request, Response } from "express";
import { MessageService } from "../../application/MessageService";

export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  addMessage = async (req: Request, res: Response, next: NextFunction) => {
    let image;
    const messageData = req.body;
    try {
      if (req.file) {
        const uploadResponse = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        image = uploadResponse.url;
      }
      const message = await this.messageService.addMessage({
        ...messageData,
        image,
      });
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };

  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    const { from, to } = req.body;
    try {
      const messages = await this.messageService.getAllMessages(from, to);
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  };

  downloadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { public_id } = req.params;
      const imageUrl = cloudinary.url(public_id, {
        flags: "attachment",
      });
      res.redirect(imageUrl);
    } catch (error) {
      next(error);
    }
  };
}

import { NextFunction, Request, Response } from "express";
import { MessageService } from "../../application/MessageService";

export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  addMessage = async (req: Request, res: Response, next: NextFunction) => {
    const message = req.body;
    try {
      await this.messageService.addMessage(message);
      res.status(200).json({ msg: "Add message successfully" });
    } catch (error) {
      next(error);
    }
  };

  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    const message = req.body;
    try {
      const messages = await this.messageService.getAllMessages(message);
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  };
}

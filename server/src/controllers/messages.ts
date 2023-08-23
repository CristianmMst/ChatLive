import { Request, Response } from "express";
import * as messagesServices from "../services/messages";

export const addMessage = async (req: Request, res: Response) => {
  try {
    const { from, to, message } = req.body;
    const addMessage = await messagesServices.addMessage({ from, to, message });
    if (addMessage) return res.json({ msg: "Add message successfully" });
    return res.json({ msg: "Failed to add message" });
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.body;
    const allMessages = await messagesServices.getAllMessages({ from, to });
    res.json(allMessages);
  } catch (error) {
    console.log(error);
  }
};

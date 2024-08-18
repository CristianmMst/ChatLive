import { Message } from "../../domain/Message";
import { messageModel } from "../models/MessageModel";
import { MessageRepository } from "../../domain/MessageRepository";

export class MongoMessageRepository implements MessageRepository {
  async addMessage({ from, to, text, image }: Message): Promise<void> {
    await messageModel.create({
      message: {
        text,
        image,
      },
      users: [from, to],
      sender: from,
    });
  }

  async getMessages(from: string, to: string): Promise<any[]> {
    const messages = await messageModel
      .find({ users: { $all: [from, to] } })
      .sort({ updateAt: 1 });
    const messagesMapper = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message?.text,
        createdAt: msg.createdAt,
      };
    });
    return messagesMapper;
  }
}

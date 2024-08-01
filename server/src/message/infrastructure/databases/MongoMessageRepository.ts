import { Message } from "../../domain/Message";
import { messageModel } from "../models/MessageModel";
import { MessageRepository } from "../../domain/MessageRepository";

export class MongoMessageRepository implements MessageRepository {
  async addMessage({ from, to, message }: Message): Promise<void> {
    await messageModel.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });
  }

  // Types
  async getMessages({ from, to }: any): Promise<any[]> {
    const messages = await messageModel
      .find({ users: { $all: [from, to] } })
      .sort({ updateAt: 1 });
    const messagesMapper = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message?.text,
      };
    });
    return messagesMapper;
  }
}

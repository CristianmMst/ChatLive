import { Message } from "../../domain/Message";
import { messageModel } from "../models/MessageModel";
import { MessageRepository } from "../../domain/MessageRepository";

export class MongoMessageRepository implements MessageRepository {
  async addMessage({ from, to, text, image }: Message) {
    await messageModel.create({
      message: {
        text,
        image,
      },
      users: [from, to],
      sender: from,
    });
  }

  async getMessages(from: string, to: string) {
    const messages = await messageModel
      .find({ users: { $all: [from, to] } })
      .sort({ updateAt: 1 });
    const messagesMapper = messages.map(({ sender, message, createdAt }) => {
      return {
        fromSelf: sender.toString() === from,
        text: message?.text,
        createdAt: createdAt,
        image: message?.image,
      };
    });
    return messagesMapper;
  }
}

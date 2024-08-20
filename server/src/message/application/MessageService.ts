import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";

export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async addMessage(messageData: Message) {
    const message = new Message(
      messageData.to,
      messageData.from,
      messageData.text,
      messageData.image,
    );
    await this.messageRepository.addMessage(message);
    return message;
  }

  async getAllMessages(from: string, to: string) {
    const messages = await this.messageRepository.getMessages(from, to);
    return messages;
  }
}

import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";

export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async addMessage(message: Message) {
    await this.messageRepository.addMessage(message);
  }

  async getAllMessages(message: Message) {
    const messages = await this.messageRepository.getMessages(message);
    return messages;
  }
}

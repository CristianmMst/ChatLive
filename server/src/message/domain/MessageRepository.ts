import { Message } from "./Message";

export interface MessageRepository {
  addMessage(message: Message): Promise<void>;
  getMessages(message: Message): Promise<Message[]>;
}

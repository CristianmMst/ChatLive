import { Message } from "./Message";

export interface MessageRepository {
  addMessage(message: Message): Promise<void>;
  getMessages(from: string, to: string): Promise<Message[]>;
}

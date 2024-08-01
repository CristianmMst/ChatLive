import { Contacts, User } from "./User";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  getContacts(id: string): Promise<Contacts[]>;
  findByEmail(email: string): Promise<User | null>;
}

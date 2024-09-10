import { User } from "./User";

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateUser(id: string, user: User): Promise<User | null>;
  getContacts(id: string): Promise<Pick<User, "id" | "username">[]>;
}

import { Contacts, User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async getContacts(id: string): Promise<Contacts[]> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    const users = await this.userRepository.getContacts(id);
    return users;
  }
}

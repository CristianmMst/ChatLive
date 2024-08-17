import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserNotFound } from "../domain/exceptions/UserNotFound";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFound();
    return user;
  }

  async getContacts(id: string): Promise<Pick<User, "id" | "username">[]> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFound();
    const users = await this.userRepository.getContacts(id);
    return users;
  }
}

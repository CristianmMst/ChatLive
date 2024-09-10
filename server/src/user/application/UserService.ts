import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserNotFound } from "../domain/exceptions/UserNotFound";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<Omit<User, "password" | "googleId">> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFound();
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      username: user.username,
    };
    return userWithoutPassword;
  }

  async getContacts(id: string): Promise<Pick<User, "id" | "username">[]> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFound();
    const users = await this.userRepository.getContacts(id);
    return users;
  }

  async updateUser(
    id: string,
    user: User,
  ): Promise<Omit<User, "password" | "googleId"> | null> {
    const userUpdated = await this.userRepository.updateUser(id, user);
    if (!userUpdated) return null;
    const userWithoutPassword = {
      id: userUpdated.id,
      email: userUpdated.email,
      avatar: userUpdated.avatar,
      username: userUpdated.username,
    };

    return userWithoutPassword;
  }
}

import { userModel } from "../models/userModel";
import { Contacts, User } from "../../../user/domain/User";
import { UserRepository } from "../../../user/domain/UserRepository";

export class MongoUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await userModel.create(user);
  }
  async findById(id: string): Promise<User | null> {
    const user = await userModel.findById({ _id: id });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await userModel.findOne({ email });
    return user;
  }

  async getContacts(id: string): Promise<Contacts[]> {
    const users = await userModel.find({ _id: { $ne: id } });
    const contacts = users.map(({ id, username }) => {
      return {
        id,
        username,
      };
    });
    return contacts;
  }
}

import { userModel } from "../models/userModel";
import { User } from "../../../user/domain/User";
import { UserRepository } from "../../../user/domain/UserRepository";
import { messageModel } from "../../../message/infrastructure/models/MessageModel";

export class MongoUserRepository implements UserRepository {
  async save(user: User) {
    const userSaved = await userModel.create(user);
    return userSaved;
  }
  async findById(id: string) {
    const user = await userModel.findById({ _id: id });
    return user;
  }

  async findByEmail(email: string) {
    const user = await userModel.findOne({ email });
    return user;
  }

  async getContacts(id: string) {
    const users = await userModel.find({ _id: { $ne: id } });

    const contacts = await Promise.all(
      users.map(async ({ id, username, avatar }) => {
        const lastMessage = await messageModel
          .findOne({
            users: { $all: [id, users[0].id] },
          })
          .sort({ createdAt: -1 });

        return {
          id,
          avatar,
          username,
          lastMessage: lastMessage,
        };
      }),
    );
    return contacts;
  }

  async updateUser(id: string, user: User) {
    return await userModel.findByIdAndUpdate({ _id: id }, user, {
      new: true,
    });
  }
}

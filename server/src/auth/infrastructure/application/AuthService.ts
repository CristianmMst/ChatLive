import { User } from "../../../user/domain/User";
import { UserRepository } from "../../../user/domain/UserRepository";
import { comparePassword, createToken, encryptPassword } from "../utils/auth";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const passwordIsCorrect = await comparePassword(password, user.password);
    if (!passwordIsCorrect) throw new Error("Credentials are incorrect");

    const token = createToken(user.id!);
    return token;
  }

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) throw new Error("User already exists");

    const passwordHash = await encryptPassword(password);
    const user = new User(email, username, passwordHash);
    await this.userRepository.save(user);
  }
}

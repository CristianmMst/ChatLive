import { User } from "../../user/domain/User";
import { UserRepository } from "../../user/domain/UserRepository";
import {
  createToken,
  comparePassword,
  encryptPassword,
} from "../infrastructure/utils/auth";
import { LoginUserDto } from "./dtos/LoginUserDto";
import { RegisterUserDto } from "./dtos/RegisterUserDto";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login({ email, password }: LoginUserDto): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const passwordIsCorrect = await comparePassword(password, user.password);
    if (!passwordIsCorrect) throw new Error("Credentials are incorrect");

    const token = createToken(user.id!);
    return token;
  }

  async register({
    email,
    username,
    password,
  }: RegisterUserDto): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) throw new Error("User already exists");

    const passwordHash = await encryptPassword(password);
    const user = new User(email, username, passwordHash);
    await this.userRepository.save(user);
  }
}

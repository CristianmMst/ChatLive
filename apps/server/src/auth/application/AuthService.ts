import { Profile } from "passport";
import { User } from "../../user/domain/User";
import { UserRepository } from "../../user/domain/UserRepository";
import { InvalidCredential } from "../domain/exceptions/InvalidCredential";
import { UserAlreadyExists } from "../domain/exceptions/UserAlreadyExists";
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

    if (!user) throw new InvalidCredential();
    if (!user.password)
      throw new InvalidCredential(
        "Correo ya existente, prueba con otro metodo",
      );

    const passwordIsCorrect = await comparePassword(password, user.password!);
    if (!passwordIsCorrect) throw new InvalidCredential();

    return createToken(user.id!);
  }

  async register({
    email,
    username,
    password,
  }: RegisterUserDto): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) throw new UserAlreadyExists();

    const passwordHash = await encryptPassword(password);
    const user = new User({ email, username, password: passwordHash });
    await this.userRepository.save(user);
  }

  async handleGoogleAuth(profile: Profile): Promise<User> {
    const email = profile.emails?.[0].value!;
    const avatar = profile.photos?.[0].value!;
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) {
      const user = new User({
        email,
        avatar,
        googleId: profile.id,
        username: profile.displayName,
      });
      return this.userRepository.save(user);
    }
    return userExists;
  }
}

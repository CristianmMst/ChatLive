import { Profile } from "passport";
import UserModel from "../models/user";
import { UserLocal } from "../types/auth";
import { comparePassword, createToken, encryptPassword } from "../utils/auth";

export const registerUserLocal = async ({
  email,
  username,
  password,
}: UserLocal) => {
  const userExists = await UserModel.findOne({ email });
  if (userExists) throw new Error("Esta cuenta ya existe");
  const passwordHash = await encryptPassword(password);
  const newUser = await UserModel.create({
    email,
    username,
    password: passwordHash,
  });
  return createToken(newUser.id);
};

export const loginUserLocal = async ({ email, password }: UserLocal) => {
  const userExists = await UserModel.findOne({ email });
  if (!userExists) throw new Error("Esta cuenta no existe");
  const passwordIsCorrect = await comparePassword(
    password,
    userExists.password!
  );
  if (!passwordIsCorrect) throw new Error("Contraseña incorrecta");
  return createToken(userExists.id);
};

export const joinWithGoogle = async (user: Profile) => {
  const userExists = await UserModel.findOne({ googleId: user.id });
  if (userExists)
    return {
      id: userExists._id,
      googleId: userExists.googleId,
      username: userExists.username,
    };
  const newUser = await UserModel.create({
    googleId: user.id,
    username: user.displayName,
  });
  return newUser;
};

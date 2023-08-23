import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { User } from "../types/auth";

// Encrypt password
export const encryptPassword = async (password: string) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
};

export const comparePassword = async (
  password: string,
  passwordHash: string
) => {
  const passwordIsCorrect = await compare(password, passwordHash);
  return passwordIsCorrect;
};

// JSON Web Token
export const createToken = (id: string) => {
  return sign({ id }, "SECRET_TOKEN");
};

export const verifyToken = (token: string) => {
  const validToken = verify(token, "SECRET_TOKEN") as User;
  return validToken;
};

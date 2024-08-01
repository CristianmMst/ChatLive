import { hash, compare } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export const encryptPassword = async (password: string) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
};

export const comparePassword = async (
  password: string,
  passwordHash: string,
) => {
  const passwordIsCorrect = await compare(password, passwordHash);
  return passwordIsCorrect;
};

export const createToken = (id: string) => {
  return sign({ id }, "SECRET_TOKEN");
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, "SECRET_TOKEN") as JwtPayload;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

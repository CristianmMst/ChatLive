import { hash, compare } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { InvalidToken } from "../../domain/exceptions/InvalidToken";

const JWT_SECRET = process.env.JWT_SECRET!;

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
  return sign({ id }, JWT_SECRET);
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new InvalidToken();
  }
};

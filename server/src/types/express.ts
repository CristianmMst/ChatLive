import { User } from "./auth";
import { Session } from "express-session";

export interface RequestAuth extends Request {
  user: User;
}

export interface CustomSession extends Session {
  token: string;
}

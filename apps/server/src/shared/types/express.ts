import { Request } from "express";

interface User {
  id: string;
  email: string;
  username: string;
}

export interface RequestAuth extends Request {
  user?: User;
}
